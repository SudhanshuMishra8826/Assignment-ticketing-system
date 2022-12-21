import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Ticket } from '../types/tickets';
import { UpdateTicketPayload } from '../types/UpdateTicketPayload';

export default function Card() {
    const { ticketId } = useParams()
    const [ticket, setTicket] = useState<Ticket>()
    useEffect(() => {
        updateTicket()
    }, [])

    const updateTicket = () => {
        axios.get(`http://localhost:8000/${ticketId}`).then((res: any) => {
            console.log(res);
            setTicket(res.data[0])
        }).catch((err: any) => {
            console.log(err)
        })
    }

    const handleChange: any = (value: string) => {
        if (!checkValidOperation().includes(Number(value))) {
            alert('Invalid Operation')
            return
        }
        const params: UpdateTicketPayload = { status: value }

        axios.post(`http://localhost:8000/${ticketId}`, params).then((res: any) => {
            updateTicket()
        }).catch((err: any) => {
            console.log(err)
        })
        return
    }

    const checkValidOperation: any = () => {
        if (ticket?.status === 0) {
            return [1]
        }
        if (ticket?.status === 1) {
            return [0, 2]
        }
        if (ticket?.status === 2) {
            return [1]
        }
        return []
    }
    return (
        <>
            <Link to={'/'} style={{ textDecoration: "none", padding: "10px", color: 'black' }}> {`< Back`} </Link>

            <div>
                <p style={{
                    border: '2px solid black', margin: '20px', padding: '20px', background: '#dfdfdf', textAlign: 'center'
                }}>{ticket?.title}</p>
                {/* dropdown  */}
                <select name="status" id="status" style={{
                    textAlign: "center",
                    display: "block",
                    margin: "0 auto"
                }} value={String(ticket?.status)} onChange={(e) => { handleChange(e.target.value) }}>
                    <option value="0">Open</option>
                    <option value="1">In Progress</option>
                    <option value="2">Code Review</option>
                </select>
            </div >
        </>
    )
}
