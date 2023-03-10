import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useTheme } from "@emotion/react";

import TicketsTable from './TicketsTable';
import * as ticketsActions from '../../store/actions/tickets';


const Tickets = props => {
    const tickets = useSelector(state => state.tickets.tickets);
    const dispatch = useDispatch();
    const theme = useTheme();

    const [fetchTicketsLoading, setFetchTicketsLoading] = useState(true);
    const [refreshingTickets, setRefreshingTickets] = useState(false);

    const refreshTickets = async () => {
        setRefreshingTickets(true);
        try {
            await dispatch(ticketsActions.fetchTickets());
            setRefreshingTickets(false);
        } catch (err){
            alert(err.message);
            setRefreshingTickets(false);
        }
    }

    const loadTickets = useCallback(async () => {
        try {
            if (tickets.length === 0){
                await dispatch(ticketsActions.fetchTickets());
            }
            setFetchTicketsLoading(false);
        } catch (err) {
            alert(err.message);
            setFetchTicketsLoading(false);
        }
    }, [dispatch, tickets]);

    useEffect(() => {
        loadTickets()
        const loadTicketsInterval = setInterval(() => {
            loadTickets()
        }, 600000);
        //loadTickets();
        return () => {
            clearInterval(loadTicketsInterval);
        }
    }, [loadTickets]);

    if (fetchTicketsLoading) {
        return (
            <div style={{ padding: 20, alignItems: "center", justifyContent: "center" }}>
                 <CircularProgress sx={{color: theme.palette.secondary.light}} />
            </div>
        )
    }
    return (
        <div style={{ padding: 20 }}>
            {   tickets.length > 0 ? 
                <TicketsTable 
                    {...props} 
                    tickets={tickets} 
                    refreshTickets={refreshTickets} 
                    refreshing={refreshingTickets} 
                /> : 
                null 
            }
        </div>
    )
}

export default Tickets;