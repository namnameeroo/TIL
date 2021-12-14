SELECT P.poll_id, P.title as title, COUNT(SV.poll_id) AS vote_count, P.create_at::date, 
			P.end_at::date, P.host_id, (P.end_at::date - NOW()::date) as d_day , size, connect
		FROM poll P 
		LEFT JOIN (SELECT distinct(PV.poll_id), SUB.create_at
				FROM (SELECT distinct(subPV.create_at) FROM poll_vote subPV JOIN poll_question PQ on PQ.question_id = subPV.question_id WHERE PQ.valid = 1) SUB
				JOIN poll_vote PV ON SUB.create_at = PV.create_at) SV ON P.poll_id = SV.poll_id
		INNER JOIN public.user u ON u.member_id = P.host_id
		WHERE P.valid=1 AND u.member_id = 2::integer
		GROUP BY P.poll_id
		ORDER BY P.poll_id
