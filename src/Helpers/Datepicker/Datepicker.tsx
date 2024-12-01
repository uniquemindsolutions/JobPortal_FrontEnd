import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface ReusableDatePickerProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    name: string;
}
const Datepicker: React.FC<ReusableDatePickerProps> = ({ selectedDate, onChange, name }:any) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };
    return (
        <main>

            {/* <label htmlFor="start_date">Start Date:</label> */}
            <DatePicker
                selected={selectedDate}
                onChange={handleStartDateChange}
                name={name}
                dateFormat="YYYY-MM-DD"
                className="form-control"
                />
            <DatePicker
                selected={selectedDate}
                onChange={handleEndDateChange}
                name={name}
                dateFormat="YYYY-MM-DD"
                className="form-control"
                />
            
            {/* <DatePicker
                className="form-control"
                id="end_date"
                selected={endDate}
                onChange={handleEndDateChange}
                name="end_date"
                dateFormat="yyyy-MM-dd"
            /> */}
        </main>

    );
}

export default Datepicker