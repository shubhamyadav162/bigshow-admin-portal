
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const mockTransactions = [
  {
    id: "txn_001",
    user: "John Doe",
    plan: "Premium Monthly",
    amount: 299,
    date: "2024-01-15",
    method: "Razorpay",
    status: "completed"
  },
  {
    id: "txn_002", 
    user: "Sarah Smith",
    plan: "Basic Yearly",
    amount: 999,
    date: "2024-01-14",
    method: "LightSpeed",
    status: "completed"
  },
  {
    id: "txn_003",
    user: "Mike Johnson",
    plan: "Premium Yearly",
    amount: 2999,
    date: "2024-01-14",
    method: "Razorpay",
    status: "pending"
  },
  {
    id: "txn_004",
    user: "Emily Davis",
    plan: "Basic Monthly",
    amount: 99,
    date: "2024-01-13",
    method: "LightSpeed",
    status: "completed"
  }
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-foreground">{transaction.user}</p>
                    <p className="text-sm text-muted-foreground">{transaction.plan}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-foreground">₹{transaction.amount}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
                <Badge 
                  variant={transaction.method === "Razorpay" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {transaction.method}
                </Badge>
                <Badge 
                  variant={transaction.status === "completed" ? "default" : "secondary"}
                  className={cn(
                    "text-xs",
                    transaction.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  )}
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
