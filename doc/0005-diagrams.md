sequenceDiagram
  participant S as Seller
  participant G as GATS
  participant O as Origin
  participant E as EWC
  participant B as Buyer
  participant A as Auditor

  S->>G: Request posting for sale
  G->>G: Lock RECs in bulletin board account
  G->>O: Post RECs for sale
  O->>E: Anchor REC (owner, device id, rec id)
  O->>O: Create Ask
  opt Trade
    B->>O: Create Bid
    O->>O: Trade 
    O->>G: Transfer RECs
    B->>G: Confirm Transfer
    G->>G: Transfer RECs
    G->>O: Confirm transfer of RECs
    O->>E: Update REC (new owner) 
    O->>E: Store trade private proof (seller, buyer, volume, price)
  end
  opt Claim
    B->>G: Request claiming
    G->>G: Claim RECs
    G->>O: Send claim data
    O->>E: Update REC (new state claimed)
  end
  opt Remove
    G->>O: Request REC removal
    O->>O: Delete Ask
    O->>G: Transfer RECs to user's active account
  end
  opt Audit
    B->>A: Request audit & provide data
    A->>E: Check proofs & validate audit trail  
  end
