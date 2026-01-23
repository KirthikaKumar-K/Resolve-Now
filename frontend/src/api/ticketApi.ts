const BASE_URL = 'http://localhost:8080/api/tickets'

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED'

export interface Ticket {
    id: number
    title: string
    description: string
    status: TicketStatus
}

export const getTickets = async (): Promise<Ticket[]> => {
    const res = await fetch(BASE_URL)
    return res.json()
}

export const createTicket = async (ticket: {
    title: string
    description: string
}) => {
    await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket),
    })
}

export const updateTicketStatus = async (
    id: number,
    status: TicketStatus
) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    })
}


export const createGitHubIssue = async (title: string, description: string, labels: string[], assignees: string[]) => {
    await fetch('http://localhost:8080/api/github/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, labels, assignees }),
    })
}
