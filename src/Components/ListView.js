import React from 'react'
import * as dates from 'date-arithmetic'
import PropTypes from 'prop-types'
import { Icon, ListItemText } from '@mui/material';
import dayjs from 'dayjs'
import Divider from '@mui/material/Divider';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, Typography } from "@mui/material";

function rangeFunc(start, end, unit = 'day') {
  let current = start
  const days = []
  while (dates.lte(current, end, unit)) {
    days.push(current)
    current = dates.add(current, 1, unit)
  }
  return days
}

function inRange(e, start, end, accessors) {
  const eStart = dates.startOf(accessors.start(e), 'day')
  const eEnd = accessors.end(e)
  const startsBeforeEnd = dates.lte(eStart, end, 'day')
  const endsAfterStart = !dates.eq(eStart, eEnd, 'minutes')
    ? dates.gt(eEnd, start, 'minutes')
    : dates.gte(eEnd, start, 'minutes')
  return startsBeforeEnd && endsAfterStart
}

export const CustomListView = ({ accessors, localizer, length, date, events, ...props }) => {
  const renderDay = (day, events) => {
    events = events.filter((e) =>
      inRange(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), accessors)
    )
    return events.map((event, idx) => {
      return (
        <TableRow key={idx} 
            hover
            onClick={()=>{
                props.onSelectEvent(event);
            }}
        >
          {idx === 0 && (<>
                <TableCell style={{color: "white"}}>
                    {localizer.format(day, 'MMMM DD')}
                </TableCell>

                <TableCell style={{color: "white"}}> {(()=>{
                    switch (event.resource.type) {
                        case "quiz": return "Quiz";
                        case "assignment": return "Assignment";
                        case "custom": return "Event";
                    }
                })()} </TableCell>

                <TableCell>
                    <ListItemText
                        style={{color: "white"}}
                        primary={event.title}
                        secondary={event.resource.courseName}
                    />
                </TableCell>

                { event.resource.type === "custom" && props.selectable &&
                <TableCell>
                    <IconButton
                        style={{height: "auto"}}
                        onClick={(e)=>{
                            props.onDelete(event);
                            e.stopPropagation();
                        }}
                    >
                        <DeleteIcon style={{color: "gray"}}/>
                    </IconButton>
                </TableCell>
                }
            <Divider /> 
          </>)}
        </TableRow>
      )
    }, [])
  }

  const end = dates.add(date, length, 'day')
  const range = rangeFunc(date, end, 'day')
  events = events.filter((event) => inRange(event, date, end, accessors))
  events.sort((a, b) => +accessors.start(a) - +accessors.start(b))

  if (events.length !== 0) {
    return (
        <TableContainer style={{width: "100%"}}>
            <colgroup>
                <col width="33%" />
                <col width="33%" />
                <col width="33%" />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell><Typography variant="h5">Date</Typography></TableCell>
                    <TableCell><Typography variant="h5">Type</Typography></TableCell>
                    <TableCell><Typography variant="h5">Name</Typography></TableCell>
                    <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody>
            {range.map((day, idx) => renderDay(day, events, idx))}
            </TableBody>
        </TableContainer>
    )
  } else {
      return (
        <Typography variant="h5" style={{color: "white"}}>No events this month</Typography>
      )
  }
}

CustomListView.title = (start, { localizer }) => {
  const end = dates.add(start, 1, 'month')
  return localizer.format({ start, end }, 'agendaHeaderFormat')
}

CustomListView.navigate = (date, action) => {
  const sDate = dayjs(date).startOf('month').toDate()
  switch (action) {
    case 'PREV':
      return dates.add(sDate, -1, 'month')
    case 'NEXT':
      return dates.add(sDate, 1, 'month')
    default:
      return date
  }
}
