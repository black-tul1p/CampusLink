import React from 'react'
import * as dates from 'date-arithmetic'
import PropTypes from 'prop-types'
import { List, ListItem, ListItemText } from '@mui/material';
import dayjs from 'dayjs'
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import { PropaneSharp } from '@mui/icons-material';

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
        <div key={idx}>
          {idx === 0 && (<>
            <ListItem disablePadding>
            <ListItemButton onClick={()=>{
                props.onSelectEvent(event);
            }}>
                <ListItemText 
                    style={{color: "white"}}
                    primary={localizer.format(day, 'MMMM DD')}
                />
                <ListItemText
                    style={{color: "white"}}
                    primary={event.title}
                    secondary={event.resource.courseName}
                />
            </ListItemButton>
            </ListItem>
            <Divider /> 
          </>)}
        </div>
      )
    }, [])
  }

  const end = dates.add(date, length, 'day')
  const range = rangeFunc(date, end, 'day')
  events = events.filter((event) => inRange(event, date, end, accessors))
  events.sort((a, b) => +accessors.start(a) - +accessors.start(b))

  return (
    <div>
    <List style={{color: "white"}}>
      {events.length !== 0
        ? range.map((day, idx) => renderDay(day, events, idx))
        : 'No events this month'}
    </List>
    </div>
  )
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
