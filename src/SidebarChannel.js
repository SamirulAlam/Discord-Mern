import React from 'react';
import "./SidebarChannel.css";
import { useDispatch } from 'react-redux';
import { setChannelInfo } from './features/appSlice';

function SidebarChannel({timestamp,id,channelName}) {
    const dispatch=useDispatch()
    return (
        <div className="sidebarChannel">
            <div className="sidebarChannel" onClick={()=>dispatch(setChannelInfo({
            channelName: channelName,
            channelId: id,
            timestamp: timestamp
        }))}>
            <h4>
                <span className="sidebarChannel__hash">#</span>{channelName}
            </h4>
        </div>
        </div>
    )
}

export default SidebarChannel
