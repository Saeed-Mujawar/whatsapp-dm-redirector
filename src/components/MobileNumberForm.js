import React from 'react';
import { Form, Button, notification } from 'antd';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the default styles
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

const MobileNumberForm = ({ onAddChat }) => {
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleSubmit = (values) => {
    if (isValidPhoneNumber(phoneNumber)) {
      try {
        // Parse the phone number and extract the national number
        const parsedNumber = parsePhoneNumber(phoneNumber);
        const nationalNumber = parsedNumber ? parsedNumber.nationalNumber : '';

        onAddChat(nationalNumber);
        window.open(`https://wa.me/${nationalNumber}`, '_blank');
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'There was an error redirecting to WhatsApp.',
        });
      }
    } else {
      notification.error({
        message: 'Invalid Number',
        description: 'Please enter a valid phone number.',
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: '500px', margin: 'auto' }}
    >
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <PhoneInput
          international
          defaultCountry="IN"
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeholder="Enter phone number"
        />
      </Form.Item>

      <Form.Item>
        <Button 
            type="primary"
            block
            style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
            htmlType="submit"
        >
          Redirect to WhatsApp
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MobileNumberForm;
