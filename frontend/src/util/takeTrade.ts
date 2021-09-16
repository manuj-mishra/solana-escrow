import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Account, Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
// @ts-ignore
import BN from "bn.js";
import { ESCROW_ACCOUNT_DATA_LAYOUT, EscrowLayout } from "./layout"; 

const connection = new Connection("http://localhost:8899", 'singleGossip');

export const takeTrade = async (
    privateKeyByteArray: string,
    escrowAccountAddressString: string,
    takerXTokenAccountAddressString: string,
    takerYTokenAccountAddressString: string,
    takerExpectedXTokenAmount: number,
    programIdString: string,
) => {
    const takerAccount = new Account(privateKeyByteArray.split(',').map(s => parseInt(s)));
    const escrowAccountPubkey = new PublicKey(escrowAccountAddressString);
    const takerXTokenAccountPubkey = new PublicKey(takerXTokenAccountAddressString);
    const takerYTokenAccountPubkey = new PublicKey(takerYTokenAccountAddressString);
    const programId = new PublicKey(programIdString);

    let encodedEscrowState;
    try {
        encodedEscrowState = (await connection.getAccountInfo(escrowAccountPubkey, 'singleGossip'))!.data;
    } catch (err) {
        throw new Error("Could not find escrow at given address!")
    }
    const decodedEscrowLayout = ESCROW_ACCOUNT_DATA_LAYOUT.decode(encodedEscrowState) as EscrowLayout;
    const escrowState =  {
        escrowAccount: escrowAccountPubkey,
        isInitialized: !!decodedEscrowLayout.isInitialized,
        initializerMainAccount: new PublicKey(decodedEscrowLayout.initializerPubkey),
        initializerXTokenTempAccount: new PublicKey(decodedEscrowLayout.initializerTempTokenAccountPubkey),
        initializerYTokenMainAccount: new PublicKey(decodedEscrowLayout.initializerReceivingTokenAccountPubkey),
        expectedAmount: new BN(decodedEscrowLayout.expectedAmount, 10, "le")
    };

    const PDA = await PublicKey.findProgramAddress([Buffer.from("escrow")], programId);

    const exchangeInstruction = new TransactionInstruction({
        programId,
        data: Buffer.from(Uint8Array.of(1, ...new BN(takerExpectedXTokenAmount).toArray("le", 8))),
        keys: [
            { pubkey: takerAccount.publicKey, isSigner: true, isWritable: false },
            { pubkey: takerYTokenAccountPubkey, isSigner: false, isWritable: true },
            { pubkey: takerXTokenAccountPubkey, isSigner: false, isWritable: true },
            { pubkey: escrowState.initializerXTokenTempAccount, isSigner: false, isWritable: true},
            { pubkey: escrowState.initializerMainAccount, isSigner: false, isWritable: true},
            { pubkey: escrowState.initializerYTokenMainAccount, isSigner: false, isWritable: true},
            { pubkey: escrowAccountPubkey, isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
            { pubkey: PDA[0], isSigner: false, isWritable: false}
        ] 
    })    

    await connection.sendTransaction(new Transaction().add(exchangeInstruction), [takerAccount], {skipPreflight: false, preflightCommitment: 'singleGossip'});
}
