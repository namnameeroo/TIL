/*pollServiceImpl.java*/
	@Override
	public DashInfo getDashInfo(int member_id) throws Exception {
		// TODO Auto-generated method stub
		DashInfo dashInfo = new DashInfo();
		
		ArrayList<Integer> counts = mapper.getDashCountInfo(member_id);
		dashInfo.setMember_count(counts.get(0));
		dashInfo.setPoll_count(counts.get(1));
		dashInfo.setQuestion_count(counts.get(2));
		dashInfo.setVote_count(counts.get(3));
		dashInfo.setMy_poll_count(counts.get(4));
		dashInfo.setMy_question_count(counts.get(5));
		dashInfo.setRecent_my_poll_count(counts.get(6));
		dashInfo.setRecent_my_question_count(counts.get(7));
		
		dashInfo.setMy_poll_response_count(counts.get(8));
		dashInfo.setRecent_my_poll_response_count(counts.get(9));
		
		ArrayList<Poll> polls = mapper.getDashPollInfo();
		dashInfo.setPolls(polls);
		
		
		return dashInfo;
	}


/*admin_poll_SQL.xml*/

/*
	<select id="getDashCountInfo"  resultType="Integer">
		SELECT count(*) cnt FROM public.user
		UNION ALL
		SELECT count(*) FROM poll
		UNION ALL
		SELECT count(*) FROM poll_question
		UNION ALL
		SELECT COUNT(*) FROM (SELECT distinct(create_at) FROM poll_vote) PV
		UNION ALL
		SELECT count(*) FROM poll
		WHERE host_id = #{member_id}
		UNION ALL
		SELECT count(*) FROM poll_question
		WHERE host_id = #{member_id} AND valid = 1
		UNION ALL
		SELECT count(*) FROM poll
		WHERE host_id = #{member_id} and create_at > now() - interval '7 days' AND valid = 1
		UNION ALL
		SELECT count(*) FROM poll_question
		WHERE host_id = #{member_id} and create_at > now() - interval '7 days' AND valid = 1
		UNION ALL
		SELECT COUNT(SV.poll_id) AS vote_count
		FROM poll P 
			LEFT JOIN (SELECT distinct(PV.poll_id), SUB.create_at 
				FROM (SELECT distinct(create_at) FROM poll_vote) SUB
				JOIN poll_vote PV ON SUB.create_at = PV.create_at) SV ON P.poll_id = SV.poll_id
			INNER JOIN public.user u ON u.member_id = P.host_id
			WHERE P.valid=1 AND u.member_id = #{member_id}
		UNION ALL
		SELECT COUNT(SV.poll_id) AS vote_count
		FROM poll P 
		LEFT JOIN (SELECT distinct(PV.poll_id), SUB.create_at 
				FROM (
					SELECT distinct(create_at) FROM poll_vote WHERE create_at > now() - interval '7 days') SUB
				JOIN poll_vote PV ON SUB.create_at = PV.create_at) SV ON P.poll_id = SV.poll_id
		INNER JOIN public.user u ON u.member_id = P.host_id
		WHERE P.valid=1 AND u.member_id =  #{member_id}
		
		
	</select>
  */

	
