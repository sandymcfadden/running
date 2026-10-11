import type { Program } from '../types';

// 10-week half marathon training program (70 days)
// Source: Half Training Google Calendar export
// days[0] = chosen start date (Monday recommended), days[69] = race day
export const HALF_MARATHON_PROGRAM: Omit<Program, 'id' | 'createdAt' | 'startDate'> = {
  name: 'Half Marathon — 10 Week',
  days: [
    // Week 1: Aug 4–10
    { runTypeId: 'rest',                                                    // Mon Aug 4
      description: 'The first day of each weekly training segment offers recovery from the previous day and week\'s training. Take this day completely off.' },
    { runTypeId: 'fartlek',          targetDuration: '50–70 min',           // Tue Aug 5
      description: 'Include 10-12 x 1 minute at 5K-10K effort, 1 minute recovery jog between each repetition; include a warm-up and cool-down\n\nOptional workout: Only perform this if you are used to two fast workouts per week. Otherwise, just run easy. Fartlek means Speed Play. Begin this run with 10-20 minutes of easy running then alternate between a faster pace (5K-10K) and Easy Run Pace. End the workout with 10-20 minutes of easy running to cool down.' },
    { runTypeId: 'rest',                                                    // Wed Aug 6
      description: 'You may cross-train or do an easy run for 40-60 minutes today.' },
    { runTypeId: 'cruise-intervals', targetDuration: '50–70 min',           // Thu Aug 7
      description: 'Include 6-8 x 1000 meters at Cruise Interval Pace, 2-minute recovery jog between each repetition; include a warm-up and cool-down\n\nIt is critical that you learn your threshold or stamina pace. The challenge on today\'s workout will be to control your pace and avoid running too fast. These aren\'t speed repeats. They are stamina repeats. Stay within the pace range and cruise along. Short recoveries should ensure you keep the pace under control.' },
    { runTypeId: 'rest',                                                    // Fri Aug 8
      description: 'Today is an optional run day. Run for 30-50 minutes or take the day off.' },
    { runTypeId: 'easy',             targetDuration: '40–60 min',           // Sat Aug 9
      description: 'There is a toughness and strength that comes from consistently getting in one hour runs. Relish these runs as they lay the foundation for your race day success.' },
    { runTypeId: 'long-run',         targetDuration: '90 min',              // Sun Aug 10
      description: 'Fast racing comes from these endurance runs. Once you have greater endurance, you can do faster speed training. Seems counter intuitive at times, but this is the way the body works.' },

    // Week 2: Aug 11–17
    { runTypeId: 'rest',                                                    // Mon Aug 11
      description: 'Recovery day. No exercise.' },
    { runTypeId: 'easy',             targetDuration: '50–70 min',           // Tue Aug 12
      description: 'These hour+ runs are building a well of strength from which you can draw during the race.' },
    { runTypeId: 'rest',                                                    // Wed Aug 13
      description: 'You may cross-train or do an easy run for 40-60 minutes today.' },
    { runTypeId: 'tempo-intervals',  targetDuration: '50–70 min',           // Thu Aug 14
      description: 'Include 2-3 x 2 miles at Tempo Interval Pace, 4 minute recovery jog between each repetition; include a warm-up and cool-down\n\nToday is all about running relaxed yet fast. Find your perfect race rhythm and cruise along at threshold pace.' },
    { runTypeId: 'rest',                                                    // Fri Aug 15
      description: 'Today is an optional run day. Run for 30-50 minutes or take the day off.' },
    { runTypeId: 'easy',             targetDuration: '40–60 min',           // Sat Aug 16
      description: 'Another shorter easy run for recovery.' },
    { runTypeId: 'long-run',         targetDuration: '90–105 min',          // Sun Aug 17
      description: 'The goal today is just to get in the time at your Long Run Pace.' },

    // Week 3: Aug 18–24
    { runTypeId: 'rest',                                                    // Mon Aug 18
      description: 'To ensure you recover from yesterday\'s long run and are ready for tomorrow\'s mid-week longer run, take the day off completely.' },
    { runTypeId: 'progressive',      targetDuration: '80–90 min',           // Tue Aug 19
      description: 'Today is another mid-week longer run that will build your strength.' },
    { runTypeId: 'rest',                                                    // Wed Aug 20
      description: 'You may cross-train or do an easy run for 40-60 minutes today.' },
    { runTypeId: 'speed',            targetDuration: '60–80 min',           // Thu Aug 21
      description: 'Include 5-6 x 1 mile at Speed Pace, 3 minute recovery jog between each repetition; include a warm-up and cool-down\n\nThese are tough workouts but are made tougher than they should be when athletes run too fast on the first few repeats. Start under control and save something for the final few reps.' },
    { runTypeId: 'rest',                                                    // Fri Aug 22
      description: 'Today is an optional run day. Run for 30-50 minutes or take the day off.' },
    { runTypeId: 'easy',             targetDuration: '40–60 min',           // Sat Aug 23
      description: 'More endurance base provides the strength you need in the race.' },
    { runTypeId: 'long-run',         targetDuration: '90–105 min',          // Sun Aug 24
      description: 'These long runs give you the strength you need to race fast.' },

    // Week 4: Aug 25–31
    { runTypeId: 'rest',                                                    // Mon Aug 25
      description: 'Today begins your first recovery week in your plan. Every few weeks, we\'ll take a down week with lower mileage and at least two complete days off. Recovery weeks are one secret to injury-free running. Take today completely off. No exercise.' },
    { runTypeId: 'easy',             targetDuration: '40–50 min',           // Tue Aug 26
      description: 'Shorter run to maximize recovery in this recovery week.' },
    { runTypeId: 'rest',                                                    // Wed Aug 27
      description: 'Take the day off completely or you may cross-train for 40-60 minutes.' },
    { runTypeId: 'tempo',            targetDuration: '50–70 min',           // Thu Aug 28
      description: 'Include 3-5 miles at Tempo Run Pace; include a warm-up and cool-down\n\nYou worked on your threshold with the previous interval workouts, now you put it together for a continuous run at Tempo Run Pace. Warm up before and cool down after.' },
    { runTypeId: 'rest',                                                    // Fri Aug 29
      description: 'Take the day off completely.' },
    { runTypeId: 'easy',             targetDuration: '30–40 min',           // Sat Aug 30
      description: 'Shorter run to maximize recovery.' },
    { runTypeId: 'long-run',         targetDuration: '90 min',              // Sun Aug 31
      description: 'Run the last 20 minutes of this run a little faster.' },

    // Week 5: Sep 1–7
    { runTypeId: 'rest',                                                    // Mon Sep 1
      description: 'Recovery day. No exercise.' },
    { runTypeId: 'progressive',      targetDuration: '80–90 min',           // Tue Sep 2
      description: 'Finish the last 20 minutes at half-marathon pace or faster\n\nYou want to make finishing fast a habit. This run encourages that.' },
    { runTypeId: 'rest',                                                    // Wed Sep 3
      description: 'You may cross-train or do an easy run for 40-60 minutes today.' },
    { runTypeId: 'speed',            targetDuration: '60–80 min',           // Thu Sep 4
      description: 'Include 6-8 x 1200 meters at Speed Pace, 3 minute recovery jog between each repetition; include a warm-up and cool-down\n\nI call this toughness training because the last few reps will be hard. But, they are supposed to be. This way we can mimic the challenge you\'ll face near the end of the race.' },
    { runTypeId: 'rest',                                                    // Fri Sep 5
      description: 'Today is an optional run day. Run for 30-50 minutes or take the day off.' },
    { runTypeId: 'easy',             targetDuration: '40–60 min',           // Sat Sep 6
      description: 'These runs are building a well of strength from which you can draw during the race.' },
    { runTypeId: 'fast-finish-long', targetDuration: '105–135 min',         // Sun Sep 7
      description: 'Include a few miles at Long Run Pace then progress to 2-4 miles at Goal Pace.\n\nToday is your first big Fast Finish Long Run. Get in 12-14 total miles. Don\'t leave your race in this run. Focus more on cruising along at goal pace for the middle portion of your run and run fast at the end but don\'t race this workout.' },

    // Week 6: Sep 8–14
    { runTypeId: 'rest',                                                    // Mon Sep 8
      description: 'Recovery day. No exercise.' },
    { runTypeId: 'fartlek',          targetDuration: '50–70 min',           // Tue Sep 9
      description: 'Include 10-12 x 1 minute at 5K-10K effort, 1 minute recovery jog between each repetition; include a warm-up and cool-down\n\nToday is another optional pace change workout. Just run easy today or if you normally do two key workouts per week, then include this Fartlek Run.' },
    { runTypeId: 'rest',                                                    // Wed Sep 10
      description: 'You may cross-train or do an easy run for 40-60 minutes today.' },
    { runTypeId: 'tempo-intervals',  targetDuration: '50–70 min',           // Thu Sep 11
      description: 'Include 3-4 x 2 miles at Tempo Interval Pace, 4 minute recovery jog between each repetition; include a warm-up and cool-down\n\nLike a broken up Tempo Run, Tempo Intervals help you run a medium-hard pace at a relaxed rhythm.' },
    { runTypeId: 'rest',                                                    // Fri Sep 12
      description: 'Today is an optional run day. Run for 30-50 minutes or take the day off.' },
    { runTypeId: 'easy',             targetDuration: '30–40 min',           // Sat Sep 13
      description: 'These runs are building a well of strength from which you can draw during the race.' },
    { runTypeId: 'long-run',         targetDuration: '105–120 min',         // Sun Sep 14
      description: 'These long, steady runs are the foundation of endurance racing success.' },

    // Week 7: Sep 15–21
    { runTypeId: 'rest',                                                    // Mon Sep 15
      description: 'Today begins your second recovery week. As with the first one four weeks ago, the mileage will be reduced as we allow the body and mind to rejuvenate for the final few weeks before the race. Take today completely off. No exercise.' },
    { runTypeId: 'progressive',      targetDuration: '80–90 min',           // Tue Sep 16
      description: 'Finish the last 20 minutes at half-marathon pace or faster\n\nThis longer progression run should be fun! Make sure to smile a lot throughout it, especially the final fast portion.' },
    { runTypeId: 'rest',                                                    // Wed Sep 17
      description: 'You may cross-train for 40-60 minutes today.' },
    { runTypeId: 'speed',            targetDuration: '60–80 min',           // Thu Sep 18
      description: 'Include 5-6 x 1 mile at Speed Pace, 3 minute recovery jog between each repetition; include a warm-up and cool-down\n\nThis is a gut check workout. You will need to bring your mental A game to this one. The last few reps will be tough but you can do it.' },
    { runTypeId: 'rest',                                                    // Fri Sep 19
      description: 'Take the day off completely.' },
    { runTypeId: 'easy',             targetDuration: '30–40 min',           // Sat Sep 20
      description: 'Start easy and build into the pace.' },
    { runTypeId: 'fast-finish-long', targetDuration: '105–135 min',         // Sun Sep 21
      description: 'Include a few miles at Long Run Pace then progress to 2-4 miles at Goal Pace.\n\nToday is your final big Fast Finish Long Run. Get in 12-14 total miles. Don\'t leave your race in this run. Focus more on cruising along at marathon pace for the middle portion of your run and run fast at the end but don\'t race this workout.' },

    // Week 8: Sep 22–28
    { runTypeId: 'rest',                                                    // Mon Sep 22
      description: 'Recovery day. No exercise.' },
    { runTypeId: 'easy',             targetDuration: '60–70 min',           // Tue Sep 23
      description: 'An extra recovery day to help get ready for the final push to the race.' },
    { runTypeId: 'rest',                                                    // Wed Sep 24
      description: 'You may cross-train or do an easy run for 40-60 minutes today.' },
    { runTypeId: 'tempo',            targetDuration: '60–90 min',           // Thu Sep 25
      description: 'Include 3-6 miles at Tempo Run Pace; include a warm-up and cool-down\n\nAs a coach, this workout is one that I look closely at in this training plan. The goal is to now feel better running the medium-hard Tempo Run Pace than you did a few weeks ago. Include a warm-up and cool-down and resist the urge to push the pace. Better to run longer at Tempo Run Pace than shorter yet faster.' },
    { runTypeId: 'rest',                                                    // Fri Sep 26
      description: 'Today is an optional run day. Run for 30-50 minutes or take the day off.' },
    { runTypeId: 'easy',             targetDuration: '40–60 min',           // Sat Sep 27
      description: 'When in heavy training, start your runs slower and let the pace come to you instead of chasing it.' },
    { runTypeId: 'long-run',         targetDuration: '90–105 min',          // Sun Sep 28
      description: 'Another easy 90-105 minute run to build your endurance for the race.' },

    // Week 9: Sep 29–Oct 5
    { runTypeId: 'rest',                                                    // Mon Sep 29
      description: 'To kick off your peaking phase, take today completely off so you fully recover from yesterday\'s long run.' },
    { runTypeId: 'fartlek',          targetDuration: '50–70 min',           // Tue Sep 30
      description: 'Include 6-8 x 1 minute at 5K-10K effort, 1 minute recovery jog between each repetition; include a warm-up and cool-down\n\nIf you are feeling good, include the pace change within the run. If you feel you need more recovery, then skip the fartlek and just run easy.' },
    { runTypeId: 'rest',                                                    // Wed Oct 1
      description: 'You may cross-train or do an easy run for 40-60 minutes today.' },
    { runTypeId: 'steady-state',     targetDuration: '60–80 min',           // Thu Oct 2
      description: 'Include 6 miles at Steady State Pace; include a warm-up and cool-down\n\nThe goal for today is to see just how relaxed you can run Steady State Pace. This isn\'t a fitness building workout but more of a fitness refining workout.' },
    { runTypeId: 'rest',                                                    // Fri Oct 3
      description: 'Today is an optional run day. Run for 30-50 minutes or take the day off.' },
    { runTypeId: 'easy',             targetDuration: '30–40 min',           // Sat Oct 4
      description: 'Keep this run short and under control.' },
    { runTypeId: 'fast-finish-long', targetDuration: '90–120 min',          // Sun Oct 5
      description: 'Include a few miles at Long Run Pace then progress to 2-4 miles at Goal Pace.\n\nToday\'s run should not be difficult. Unlike previous Fast Finish Long Runs where you finished very fast and challenged your mental ability to push when tired, today you will simply run easy a few miles at your Long Run Pace then 2-4 miles at your Goal Pace. It\'s a last chance to dial in your race equipment, nutrition strategy, etc. The goal is 10-12 total miles.' },

    // Week 10: Oct 6–12 (race week)
    { runTypeId: 'rest',                                                    // Mon Oct 6
      description: 'Recovery day. No exercise.' },
    { runTypeId: 'cruise-intervals', targetDuration: '40–60 min',           // Tue Oct 7
      description: 'Include 4-5 x 1000 meters at Cruise Interval Pace, 2-minute recovery jog between each repetition; include a warm-up and cool-down\n\nThis is a fun workout. The pace isn\'t hard and you feel your full power as you hold yourself back to stay in the pace range. Cruise is the right mentality to carry into this workout. Enjoy this final effort before the race.' },
    { runTypeId: 'rest',                                                    // Wed Oct 8
      description: 'The next few days work to help fully restore your mental and physical energy so you are perfectly peaked for race day.' },
    { runTypeId: 'fartlek',          targetDuration: '40–60 min',           // Thu Oct 9
      description: 'Include 6-8 x 30 seconds stride, 1 minute recovery jog between each repetition; include a warm-up and cool-down\n\nLike you\'ve done in previous weeks, you can include some pace change in this run. The faster segments are shorter, 30 seconds, run at 5K pace or faster. Warm up and cool down.' },
    { runTypeId: 'rest',                                                    // Fri Oct 10
      description: 'Cross-train or run easy for 30 minutes. Running today mostly serves to burn away nervous energy. Relaxation, while running and throughout your waking hours the next few days, is important.' },
    { runTypeId: 'easy',             targetDuration: '30 min',              // Sat Oct 11
      description: 'Just an easy run to loosen up for the race.' },
    { runTypeId: 'half-marathon',    targetDuration: 'Race day!' },         // Sun Oct 12
  ],
};
