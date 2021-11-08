import React from 'react'
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

export default function DatePickerCheck() {
    return (
        <div>
            ReactDOM.render(
            <Space direction="vertical" size={12}>
                <RangePicker 
                placeholder = "abc"
                />
            </Space>,
            );
        </div>
    )
}
