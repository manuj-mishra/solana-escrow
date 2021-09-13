use std::convert::TryInto;
use solana_program::program_error::ProgramError;

use crate::error::EscrowError::InvalidInstruction;

pub enum EscrowInstruction {
    /// Starts the trade by creating and populating an escrow account and transferring ownership of the given temp token account to the PDA
    ///
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The initializer's main account
    /// 1. `[writable]` The initializer's temporary token account for the token they are offering (token X)
    /// 2. `[]` The initializer's permanent token account for the token they will receive (token Y) should the trade go through
    /// 3. `[writable]` The escrow account, it will hold all necessary state about the trade.
    /// 4. `[]` The rent sysvar
    /// 5. `[]` The token program
    InitEscrow {
        /// The amount the initializer expects to receive of token Y
        amount: u64
    },

    /// Accepts a trade
    ///
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The taker's main account
    /// 1. `[writable]` The taker's temporary token account for the token they send (token Y)
    /// 2. `[writable]` The taker's permanent token account for the token they will receive (token X) should the trade go through
    /// 3. `[writable]` The PDA's temporary token account to get tokens from and eventually close (token X)
    /// 4. `[writable]` The initializer's main account to send their rent fees to
    /// 5. `[writable]` The initializer's permanent token account that will receive tokens (token Y)
    /// 6. `[writable]` The escrow account holding the escrow info
    /// 7. `[]` The token program
    /// 8. `[]` The PDA account
    Exchange {
    /// the amount the taker expects to be paid in the other token, as a u64 because that's the max possible supply of a token
    amount: u64,
    }

}

impl EscrowInstruction {
    // Unpacks a byte buffer into an EscrowInstruction
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_first().ok_or(InvalidInstruction)?;

        Ok(match tag {
            0 => Self::InitEscrow {
                amount: Self::unpack_amount(rest)?,
            },
            1 => Self::Exchange {
                amount: Self::unpack_amount(rest)?
            },
            _ => return Err(InvalidInstruction.into()),
        })
    }

    // Takes first 8 bytes and turns into a u64
    fn unpack_amount(input: &[u8]) -> Result<u64, ProgramError> {
        let amount = input
            .get(..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(InvalidInstruction)?;
        Ok(amount)
    }
}