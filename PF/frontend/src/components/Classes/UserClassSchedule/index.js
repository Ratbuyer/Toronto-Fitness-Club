import React, { useState, useEffect } from 'react';
import ScheduleTable from '../ScheduleTable/ScheduleTable';
import { useNavigate } from 'react-router-dom';
import SchedulePagination from '../Pagination/Pagination';

const UserSchedule = () => {
	const [classes, setClasses] = useState([]);
	const [offset, setOffset] = useState(0);
	const [totalItem, setTotalItem] = useState(1);
	const [reload, setReload] = useState(false);

	let token = localStorage.getItem('token');
	let navigate = useNavigate();

	useEffect(() => {
		if (token === null) {
			navigate('/login');
		}
		fetch(`http://127.0.0.1:8000/classes/schedule?offset=${offset}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((json) => {
				setClasses(json.results);
				setTotalItem(json.count);
			});
	}, [offset, token, reload, navigate]);

	return (
		<>
			<h1 className="schedule-title">My Class Schedule</h1>
			{classes.length === 0 ? (
				<h2 className="no-class-messages">You have no enrolled classes</h2>
			) : null}
			<ScheduleTable
				classes={classes}
				isUser={true}
				isHitory={false}
				reload={reload}
				setReload={setReload}
			/>
			<SchedulePagination
				lastpage={Math.ceil(totalItem / 10)}
				offset={offset}
				setOffset={setOffset}
			/>
		</>
	);
};

export default UserSchedule;
