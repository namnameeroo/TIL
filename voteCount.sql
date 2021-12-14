SELECT P.poll_id, P.title as title, COUNT(SV.poll_id) AS vote_count, P.create_at::date, 
			P.end_at::date, P.host_id, (P.end_at::date - NOW()::date) as d_day , size, connect
		FROM poll P 
		LEFT JOIN (SELECT distinct(PV.poll_id), SUB.create_at 
				FROM (SELECT distinct(create_at) FROM poll_vote) SUB
				JOIN poll_vote PV ON SUB.create_at = PV.create_at) SV ON P.poll_id = SV.poll_id
		INNER JOIN public.user u ON u.member_id = P.host_id
		WHERE P.valid=1 AND u.member_id = #{member_id}::integer
		GROUP BY P.poll_id
		ORDER BY P.poll_id
