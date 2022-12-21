import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Ticket } from '../types/tickets';

export default function List() {
    const [tickets, setTickets] = useState<Ticket[]>([])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000`).then((res: any) => {
            console.log(res);
            setTickets(res.data)
        }).catch((err: any) => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            {
                tickets.map((ticket: any) => {
                    return <Link to={'/ticket/' + ticket?.id} style={{ textDecoration: "none" }}><div key={ticket.id} style={{ border: '2px solid black', margin: '20px', padding: '20px', color: "black" }} >{ticket?.title}</div></Link>
                })
            }
        </div>
    )
}
