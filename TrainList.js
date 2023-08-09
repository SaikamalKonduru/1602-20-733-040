import React, { useEffect, useState } from 'react';
import { getTrains } from '../api';
import { Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const TrainsList = ({ token }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      const data = await getTrains(token);
      setTrains(data);
    };

    fetchTrains();
  }, [token]);

  return (
    <div className={classes.root}>
      <h2 className={classes.header}>All Trains</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Train Name</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Seats Available (Sleeper)</TableCell>
              <TableCell>Seats Available (AC)</TableCell>
              <TableCell>Price (Sleeper)</TableCell>
              <TableCell>Price (AC)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trains.map((train) => (
              <TableRow key={train.trainNumber}>
                <TableCell>{train.trainName}</TableCell>
                <TableCell>{/* Format departure time */}</TableCell>
                <TableCell>{train.seatsAvailable.sleeper}</TableCell>
                <TableCell>{train.seatsAvailable.AC}</TableCell>
                <TableCell>{train.price.sleeper}</TableCell>
                <TableCell>{train.price.AC}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TrainsList;
