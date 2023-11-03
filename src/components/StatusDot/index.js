import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const StatusDot = ({ status }) => {
  const [color, setColor] = useState('');
  useEffect(() => {
    if (status == 'open') setColor('#1eff00');
    else if (status == 'progress') setColor('#ff9c00');
    else if (status == 'finished') setColor('#008aff');
  }, []);

  const Status = styled(Box)({
    background: color,
    boxShadow: `0px 0px 10px ${color}`,
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    marginRight: '10px',
  });
  return <Status />;
};

export default StatusDot;
