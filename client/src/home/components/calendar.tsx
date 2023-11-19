import React from "react";

const Calendar = () => {
  return (
    <>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FPrague&src=ZGFuaWVsYmVuZXMwNEBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y3MuY3plY2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230B8043"
        className=""
        width="600"
        height="400"
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      ></iframe>
    </>
  );
};

export default Calendar;
