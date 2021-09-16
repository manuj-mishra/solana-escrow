## Deploy to localnet
1. Compile program with `cargo build-bpf`
2. Run localnet with `solana-test-validator`
3. Call `solana config get`
   1. If RPC URL is not `http://localhost:8899`, run `solana config set --url http://localhost:8899`
   2. If calling `solana balance` shows 0, create a new solana keypair and restart localnet with `solana-test-validator -r`
4. Call `solana deploy` command printed in step 1