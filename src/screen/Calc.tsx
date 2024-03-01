import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "../atoms";
import React from "react";

const Calc = () => {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinute(Number(event.currentTarget.value));
  };
  const onHourChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <>
      <input onChange={onChange} value={minute} placeholder="minute" />
      <input onChange={onHourChange} value={hours} placeholder="hours" />
    </>
  );
};
export default Calc;
