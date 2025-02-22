// @flow
import * as React from 'react';

type Props = {
  username?: string
};
export const UserCard = (props: Props) => {
  return (
    <div style={{border: '1px solid blue', borderRadius: '5px', padding: '4px'}}>
      Username: {props.username ?? 'user'}
      <div>
        password: 123
      </div>
    </div>
  );
};