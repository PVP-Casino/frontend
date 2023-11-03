import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Popover from '@idui/react-popover';
import walletAddressConvert from '../utility/walletAddressConvert';
import gameConfig from '../../config/game.config';
import { toUSDFormat } from '../../helpers/utils';

const stc_ = require('string-to-color');

const stc = (string) => {
  return stc_(string);
};

const ParticipantPopover = (props) => {
  const { item, total, width } = props;
  const { currentToken } = useSelector((state) => state.powerball);
  const content = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'black',
        color: 'white',
        fontSize: '12px',
        padding: '0px 5px',
        textTransform: 'uppercase',
      }}
    >
      {walletAddressConvert(item.address, 4)} &nbsp; {((100 * item.totalAmount.totalAmount) / total).toFixed(2)}% &nbsp;{' '}
      {toUSDFormat(item.totalAmount.totalAmount)} {currentToken.tokenName} &nbsp;
      <a
        rel='noopener noreferrer'
        href={`${gameConfig.explorerUrl}/tx/${item.totalAmount.txHash[0]}`}
        target='_blank'
        className='hover'
      >
        <img alt='bscscan' src='/assets/bscscan.png' className='icon-size-20' />
      </a>
    </div>
  );
  return (
    <Popover content={content} trigger='hover'>
      <canvas
        style={{
          width: `${(width * item.totalAmount.totalAmount) / total}px`,
          background: stc(item.address.toLowerCase()),
          height: '50px',
        }}
      />
    </Popover>
  );
};

export default memo(ParticipantPopover);
