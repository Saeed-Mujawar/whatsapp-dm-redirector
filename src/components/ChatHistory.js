import React from 'react';
import { List, Button } from 'antd';

const ChatHistory = ({ chatHistory, onRemoveChat }) => {
  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2 className="text-center mt-5">Recent Numbers</h2>
      <List
        bordered
        dataSource={chatHistory}
        renderItem={(item) => (
          <List.Item 
            actions={[
              <Button type="primary" danger onClick={() => onRemoveChat(item.id)}>
                Remove
              </Button>
            ]}
          >
            {item.mobile_number}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChatHistory;
