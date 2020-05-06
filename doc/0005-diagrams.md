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
  O->>O: Create Ask
  O->>E: Store ask proof
  opt Trade
    B->>O: Create Bid
    O->>O: Trade 
    O->>E: Store trade proof
    O->>G: Transfer RECs
    B->>G: Confirm Transfer
    G->>G: Transfer RECs
  end
  opt Claim
    B->>G: Request claiming
    G->>G: Claim RECs
    G->>O: Send claim data
    O->>E: Store claim proof
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
