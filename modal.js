// modal, sql 집계



/*


SELECT title, type, content, create_at, update_at::date, start_at::date, end_at::date, size, is_public, poll_id, connect, hostgroup
		FROM poll p
		INNER JOIN public.user u ON u.member_id = p.host_id
		WHERE u.member_id = 3::integer AND p.valid = 1
		ORDER BY p.update_at desc;
		
		
// 일단 확정 poll_id poll_title poll_count
SELECT P.poll_id, P.title as poll_title, count(P.poll_id) as poll_count,
P.start_at::date, P.end_at::date, P.host_id,
(NOW()::date - P.end_at::date) as d_day , size
FROM poll P 
INNER JOIN poll_vote PV ON P.poll_id = PV.poll_id
INNER JOIN public.user u ON u.member_id = p.host_id
GROUP BY P.poll_id, P.title
WHERE P.valid=1 AND u.member_id = #{member_id}::integer


SELECT count(poll_id)
SELECT Sub.cnt, Sub.create_at, PV.poll_id
FROM (select distinct(create_at), count(create_at) as cnt from poll_vote
group by create_at) Sub
INNER JOIN poll_vote PV ON PV.create_at = Sub.create_at
GROUP BY cn

select PV.create_at
from poll_vote PV
inner join (select distinct(create_at), count(create_at) as cnt from poll_vote
group by create_at) Sub on Sub.create_at = PV.create_at

SELECT count(sub.user), poll_id
FROM poll_vote PV
right join
(select distinct(create_at) as user from poll_vote group by create_at
) sub on sub.user = PV.create_at
group by poll_id

SELECT sub.create_at
FROM (select count(create_at) as cnt, create_at from poll_vote group by create_at) sub
left join poll_vote PV on PV.create_at = sub.create_at

where PV.create_at = sub.create_at

on sub.create_at = PV.create_at


SELECT COUNT(X, P.poll_id FROM poll_vote PV
			 SELECT COUNT(create_at) FROM 
INNER JOIN poll P ON PV.poll_id = P.poll_id GROUP BY P.poll_id


SUBS SELECT connect FROM poll where poll_id = 52 limit 1
 select create_at, count(create_at) as cnt from poll_vote
group by create_at


*/
