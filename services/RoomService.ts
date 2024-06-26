import {Room} from "./models/Room";

const rooms: Room[] = [
    {name: process.env.ROOM_1_NAME, id: process.env.ROOM_1_ID},
    {name: process.env.ROOM_2_NAME, id: process.env.ROOM_2_ID},
];

exports.RoomService = {

    getAllRooms(): Room[] {
        return rooms;
    }

}
