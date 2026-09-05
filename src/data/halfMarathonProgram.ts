import type { Program } from '../types';

// 10-week half marathon training program
// Source: Half Training Google Calendar export, Aug 4 – Oct 12, 2025
// days[0] = 2025-08-04 (Monday), days[69] = 2025-10-12 (race day)
export const HALF_MARATHON_PROGRAM: Omit<Program, 'id' | 'createdAt'> = {
  name: 'Half Marathon — 10 Week',
  startDate: '2025-08-04',
  days: [
    // Week 1: Aug 4–10
    { runTypeId: 'rest' },                                    // Mon Aug 4
    { runTypeId: 'fartlek',          targetDuration: '50–70 min' },  // Tue Aug 5
    { runTypeId: 'rest' },                                    // Wed Aug 6
    { runTypeId: 'cruise-intervals', targetDuration: '50–70 min' },  // Thu Aug 7
    { runTypeId: 'rest' },                                    // Fri Aug 8
    { runTypeId: 'easy',             targetDuration: '40–60 min' },  // Sat Aug 9
    { runTypeId: 'long-run',         targetDuration: '90 min' },     // Sun Aug 10

    // Week 2: Aug 11–17
    { runTypeId: 'rest' },                                    // Mon Aug 11
    { runTypeId: 'easy',             targetDuration: '50–70 min' },  // Tue Aug 12
    { runTypeId: 'rest' },                                    // Wed Aug 13
    { runTypeId: 'tempo-intervals',  targetDuration: '50–70 min' },  // Thu Aug 14
    { runTypeId: 'rest' },                                    // Fri Aug 15
    { runTypeId: 'easy',             targetDuration: '40–60 min' },  // Sat Aug 16
    { runTypeId: 'long-run',         targetDuration: '90–105 min' }, // Sun Aug 17

    // Week 3: Aug 18–24
    { runTypeId: 'rest' },                                    // Mon Aug 18
    { runTypeId: 'progressive',      targetDuration: '80–90 min' },  // Tue Aug 19
    { runTypeId: 'rest' },                                    // Wed Aug 20
    { runTypeId: 'speed',            targetDuration: '60–80 min' },  // Thu Aug 21
    { runTypeId: 'rest' },                                    // Fri Aug 22
    { runTypeId: 'easy',             targetDuration: '40–60 min' },  // Sat Aug 23
    { runTypeId: 'long-run',         targetDuration: '90–105 min' }, // Sun Aug 24

    // Week 4: Aug 25–31
    { runTypeId: 'rest' },                                    // Mon Aug 25
    { runTypeId: 'easy',             targetDuration: '40–50 min' },  // Tue Aug 26
    { runTypeId: 'rest' },                                    // Wed Aug 27
    { runTypeId: 'tempo',            targetDuration: '50–70 min' },  // Thu Aug 28
    { runTypeId: 'rest' },                                    // Fri Aug 29
    { runTypeId: 'easy',             targetDuration: '30–40 min' },  // Sat Aug 30
    { runTypeId: 'long-run',         targetDuration: '90 min' },     // Sun Aug 31

    // Week 5: Sep 1–7
    { runTypeId: 'rest' },                                    // Mon Sep 1
    { runTypeId: 'progressive',      targetDuration: '80–90 min' },  // Tue Sep 2
    { runTypeId: 'rest' },                                    // Wed Sep 3
    { runTypeId: 'speed',            targetDuration: '60–80 min' },  // Thu Sep 4
    { runTypeId: 'rest' },                                    // Fri Sep 5
    { runTypeId: 'easy',             targetDuration: '40–60 min' },  // Sat Sep 6
    { runTypeId: 'fast-finish-long', targetDuration: '105–135 min' },// Sun Sep 7

    // Week 6: Sep 8–14
    { runTypeId: 'rest' },                                    // Mon Sep 8
    { runTypeId: 'fartlek',          targetDuration: '50–70 min' },  // Tue Sep 9
    { runTypeId: 'rest' },                                    // Wed Sep 10
    { runTypeId: 'tempo-intervals',  targetDuration: '50–70 min' },  // Thu Sep 11
    { runTypeId: 'rest' },                                    // Fri Sep 12
    { runTypeId: 'easy',             targetDuration: '30–40 min' },  // Sat Sep 13
    { runTypeId: 'long-run',         targetDuration: '105–120 min' },// Sun Sep 14

    // Week 7: Sep 15–21
    { runTypeId: 'rest' },                                    // Mon Sep 15
    { runTypeId: 'progressive',      targetDuration: '80–90 min' },  // Tue Sep 16
    { runTypeId: 'rest' },                                    // Wed Sep 17
    { runTypeId: 'speed',            targetDuration: '60–80 min' },  // Thu Sep 18
    { runTypeId: 'rest' },                                    // Fri Sep 19
    { runTypeId: 'easy',             targetDuration: '30–40 min' },  // Sat Sep 20
    { runTypeId: 'fast-finish-long', targetDuration: '105–135 min' },// Sun Sep 21

    // Week 8: Sep 22–28
    { runTypeId: 'rest' },                                    // Mon Sep 22
    { runTypeId: 'easy',             targetDuration: '60–70 min' },  // Tue Sep 23
    { runTypeId: 'rest' },                                    // Wed Sep 24
    { runTypeId: 'tempo',            targetDuration: '60–90 min' },  // Thu Sep 25
    { runTypeId: 'rest' },                                    // Fri Sep 26
    { runTypeId: 'easy',             targetDuration: '40–60 min' },  // Sat Sep 27
    { runTypeId: 'long-run',         targetDuration: '90–105 min' }, // Sun Sep 28

    // Week 9: Sep 29–Oct 5
    { runTypeId: 'rest' },                                    // Mon Sep 29
    { runTypeId: 'fartlek',          targetDuration: '50–70 min' },  // Tue Sep 30
    { runTypeId: 'rest' },                                    // Wed Oct 1
    { runTypeId: 'steady-state',     targetDuration: '60–80 min' },  // Thu Oct 2
    { runTypeId: 'rest' },                                    // Fri Oct 3
    { runTypeId: 'easy',             targetDuration: '30–40 min' },  // Sat Oct 4
    { runTypeId: 'fast-finish-long', targetDuration: '90–120 min' }, // Sun Oct 5

    // Week 10: Oct 6–12 (race week)
    { runTypeId: 'rest' },                                    // Mon Oct 6
    { runTypeId: 'cruise-intervals', targetDuration: '40–60 min' },  // Tue Oct 7
    { runTypeId: 'rest' },                                    // Wed Oct 8
    { runTypeId: 'fartlek',          targetDuration: '40–60 min' },  // Thu Oct 9
    { runTypeId: 'rest' },                                    // Fri Oct 10
    { runTypeId: 'easy',             targetDuration: '30 min' },     // Sat Oct 11
    { runTypeId: 'half-marathon',    targetDuration: 'Race day!' },  // Sun Oct 12
  ],
};
