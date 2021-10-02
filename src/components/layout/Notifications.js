import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

import { Menu, MenuItem, Tooltip, IconButton, Typography } from '@material-ui/core';
import NotificationsIcons from '@material-ui/icons/Notifications';
import ChatIcons from '@material-ui/icons/Chat';
import FavoriteIcons from '@material-ui/icons/Favorite';

import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';
import { Badge } from '@material-ui/core';

const Notifications = ({ user: { id, notifications }, markNotificationsRead }) => {
  dayjs.extend(relativeTime);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = () => {
    setAnchorEl(document.getElementById('notification-btn'));
    onMenuOpened();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    markNotificationsRead(id);
  };

  let notificationIcon;
  if (notifications?.length > 0) {
    const unViewedNotifications = notifications.filter((notification) => !notification.isViewed);
    unViewedNotifications.length > 0
      ? (notificationIcon = (
          <Badge badgeContent={unViewedNotifications.length} color="secondary">
            <NotificationsIcons />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcons />);
  } else {
    notificationIcon = <NotificationsIcons />;
  }

  let notificationsMarkup =
    notifications?.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type.type === 'VOTE' ? 'Liked' : 'Commented';
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.isViewed ? 'primary' : 'secondary';
        const icon =
          not.type.type === 'VOTE' ? (
            <FavoriteIcons color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcons color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem style={{ position: 'sticky '}} key={not.createdAt} onClick={() => handleClose()}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${not.notifier.id}`}
            >
              {not.notifier.username} {verb} your post {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={() => handleClose()}>You have no notifications yet.</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspop="true"
          onClick={(e) => handleOpen(e)}
          id="notification-btn"
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => handleClose()}>
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
};

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  user: PropTypes.array,
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);
