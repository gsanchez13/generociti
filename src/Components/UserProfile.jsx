import React, { useState, useEffect } from 'react';
import { Player } from 'video-react';
import axios from "axios";


// Array of static transactions. Operates under the assumption that this page would have access to Citi's internal information on customer transactions to display them here and calculate the difference in what is rounded up.
const transactionObjs = [
  {
    className: 'list-group-item',
    transaction: 'Purchase at CVS on 8/1/20: ',
    amtSpent: '$9.95',
    amtSpentColor: 'text-danger',
    amtRounded: '$0.05',
    amtRoundedColor: 'text-success',
  },
  {
    className: 'list-group-item',
    transaction: 'Purchase at Target on 8/2/20:',
    amtSpent: '$78.34',
    amtSpentColor: 'text-danger',
    amtRounded: '$0.66',
    amtRoundedColor: 'text-success',
  },
  {
    className: 'list-group-item',
    transaction: 'Purchase at Trader Joes on 8/3/20:',
    amtSpent: '$182.21',
    amtSpentColor: 'text-danger',
    amtRounded: '$0.79',
    amtRoundedColor: 'text-success',
  },
];

const transactionList = transactionObjs.map((transaction) => {
  return (
    <li className={transaction.className}>{transaction.transaction}
      <p className={transaction.amtSpentColor}>{transaction.amtSpent}</p>
      Amount Rounded Up:
      <p className={transaction.amtRoundedColor}>{transaction.amtRounded}</p>
    </li>
  )
});

// User states for contributers of different tiers 
const dummyState1 = {
  pool_contributions: '182.71',
  year_contributions: '182.71',
  month_contributions: '5.43',
  withdrawal_rate: '1.0',
  member_since: 'February 5th, 2020',
  months_since: 6,
  membership: 'Bronze',
  location: 'New York'
};

const dummyState2 = {
  pool_contributions: '4873.10',
  year_contributions: '351.13',
  month_contributions: '10.92',
  withdrawal_rate: '1.3',
  member_since: 'February 5th, 2017',
  months_since: 42,
  membership: 'Silver',
  location: 'Florida'
};
const networkReq = async () => {
  try {
    let url = 'https://dog.ceo/api/breeds/image/random';
    let return_obj = await axios.get(url);
    console.log(return_obj)
    return return_obj;
  }
  catch (err) {
    console.log(err)
  }
}
// Returns functional component with information 
const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(dummyState1);
  const [networkInfo, setNetworkInfo] = useState({});
  useEffect(() => {
    setNetworkInfo(networkReq())
  }, [])
  return (
    <div>
      <div className="jumbotron jumbotron-fluid" style={{ "backgroundColor": "#004785" }}>
        <div className="container">
          <h1 className="display-4 text-light">GENEROCITI</h1>
          <p className="lead text-light">View your last transactions and current withdrawal eligibility.</p>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card ml-5 mb-5" style={{ "width": "19rem" }}>
              <div className="card-header list-group-item-primary">
                Recent Transactions
              </div>
              <ul className="list-group list-group-flush">
                {transactionList}
              </ul>
            </div>
          </div>

          <div className="col-md-4 pt-3">
            <h5>Amount Rounded Up This Year:</h5>
            <p className="font-weight-light pt-2">Total Pool Contributions: <b> ${userInfo.pool_contributions}</b></p>
            <p className="font-weight-light">In This Year: <b> ${userInfo.year_contributions}</b></p>
            <p className="font-weight-light">In this month: <b>${userInfo.month_contributions}</b></p>
            <p className="font-weight-light">Location: <b>{userInfo.location}</b></p>
            <hr className="my-3" />
            <h5 className="pb-2">Timeline and Rate: </h5>
            <p className="font-weight-light">Member Since: <b> {userInfo.member_since} - {userInfo.months_since > 12 ? userInfo.months_since / 12 : userInfo.months_since} {userInfo.months_since > 12 ? 'years' : 'months'}</b></p>
            <p className="font-weight-light"> Your Current Membership Status Is:<b>  {userInfo.membership}</b></p>
            <p className="font-weight-light"> Your Current Withdrawal Rate Is:<b>  {userInfo.withdrawal_rate}%</b></p>
            <p className="font-weight-light"> Amount Available for Claim Withdrawal:<b>  ${(userInfo.withdrawal_rate * userInfo.pool_contributions).toFixed(2)}</b></p>
            <button type="button" class="btn btn-primary">File A Claim</button>
            <hr className="my-2" />
            <button type="button" class="btn btn-secondary mr-3" onClick={() => { setUserInfo(dummyState1) }}>User 1</button>{" "}
            <button type="button" class="btn btn-secondary ml-3" onClick={() => { setUserInfo(dummyState2) }}>User 2</button>
          </div>
          <div className="col-md-4 pt-3">
            <div class="card text-white bg-primary mb-3" style={{ "max-width": "25rem" }}>
              <div class="card-header">Ask Amazon Lex</div>
              <div class="card-body">
                <Player>
                  <source src={'./chatbot.mp4'} />
                </Player>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UserProfile;