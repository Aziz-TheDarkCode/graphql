export default function aziz() {
  return `    {
    user {
        id
        firstName
        lastName
        login
        email
        campus
        auditRatio
        totalUp
  audits {
grade
group {
captain {login}
object {
name
}

}
}

        totalDown
        transactions (order_by: { type: asc, amount: desc } distinct_on: [type]  where: {type: {_like: "skill_%"}} ) {
    amount
    type
}
        xps (where: {path: {_niregex: ".*piscine-js.*|.*piscine-go.*|.*checkpoint.*" }}) {
            amount
            path
        }
        events (where: {event: {path: {_ilike: "%div-01"}}}){
            level
        }
        transactions_aggregate (where: {event: {path: {_ilike: "/dakar/div-01"}}, _and: {type: {_eq: "xp"}}}) {
            aggregate {
                sum {
                    amount
                }
            }
        }
        createdAt
    }
}`;
}
