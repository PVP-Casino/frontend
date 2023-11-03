import React from 'react';
import './rules.css';
export default function Rules() {
  return (
    <div className='card Rules Page' style={{ maxHeight: '940px' }}>
      <div className='page_title  underline-yellow'>Games Rules</div>
      <div className='Page-subtle-content'>
        <div className='rules-list'>
          <div>
            <span>1. </span>
            <p>The minimum value to enter a pot is 5 USD.</p>
          </div>
          <div>
            <span>2. </span>
            <p>A player's winning chance is proportional to their entered value.</p>
          </div>
          <div>
            <span>3. </span>
            <p>A pot goes live when 2 unique addresses enter with value greater than 5 USD.</p>
          </div>
          <div>
            <span>4. </span>
            <p>Each pot has a countdown timer of 3 minutes after going live, then the winner will be calculated.</p>
          </div>
          <br />
          <div>
            <span>5. </span>
            <p>An unlimited number of players can enter within the 3 minute window.</p>
          </div>
          <br />
          <div>
            <span>6. </span>
            <p>An unlimited amount of value can be entered into the pot.</p>
          </div>
          <br />
          <div>
            <span>7. </span>
            <p>Each player can make an unlimited number of entries into the same pot.</p>
          </div>
          <div>
            <span>8. </span>
            <p>Only whitelisted tokens are accepted into the pot.</p>
          </div>
          <div>
            <span>9. </span>
            <p>All token prices are updated every 3 minutes.</p>
          </div>
          <div>
            <span>10. </span>
            <p>The Pot fee is 1.5% to 3% of the total value.</p>
          </div>
          <div>
            <span>11. </span>
            <p>ZTP holders have a reduced fee.</p>
          </div>
          <div>
            <span>12. </span>
            <p>The fee is deducted from the token entered with the largest collective value.</p>
          </div>
          <div>
            <span>13. </span>
            <p>All value that is entered into the Pot will be distributed out of the contract within 3 minutes.</p>
          </div>
          <div>
            <span>14. </span>
            <p>The fees will be collected and held for distribution, lottery or buy and burn.</p>
          </div>
          <div>
            <span>15. </span>
            <p>Players can connect their wallet directly or execute a manual transaction with the contract to enter.</p>
          </div>
          <div>
            <span>16. </span>
            <p>
              To ensure total randomness the winner is calculated with a value based on several unique and unpredictable
              factors including the hash of the next block.
            </p>
          </div>
          <div>
            <span>17. </span>
            <p>The contract will deny any transaction using a token that is not whitelisted.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
