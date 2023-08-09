import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrainDetails } from '../api';

const TrainDetails = ({ token }) => {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrainDetails = async () => {
      const data = await getTrainDetails(trainNumber, token);
      setTrain(data);
    };

    fetchTrainDetails();
  }, [trainNumber, token]);

  return (
    <div>
      <h2>Train Details</h2>
      {/* Display train details */}
    </div>
  );
};

export default TrainDetails;
