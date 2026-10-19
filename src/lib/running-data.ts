'use client';

import { RunEntry, WeeklyStats, RunningPlan } from '@/types/running';

const STORAGE_KEY = 'movementrx_running_plan';

// Your actual running data
export const runningData: RunEntry[] = [
  { id: '1', dayOfWeek: 'Monday', date: '2026-06-29', distance: 3.48, pace: '9:32', avgHR: 150, maxHR: 162, notes: '', activityType: 'run' },
  { id: '2', dayOfWeek: 'Wednesday', date: '2026-07-01', distance: 3.06, pace: '9:13', avgHR: 155, maxHR: 179, notes: '', activityType: 'run' },
  { id: '3', dayOfWeek: 'Thursday', date: '2026-07-02', distance: 2.5, pace: '9:29', avgHR: 155, maxHR: 169, notes: '', activityType: 'run' },
  { id: '4', dayOfWeek: 'Friday', date: '2026-07-03', distance: 4.34, pace: '9:48', avgHR: 150, maxHR: 179, notes: '', activityType: 'run' },
  { id: '5', dayOfWeek: 'Monday', date: '2026-07-06', distance: 5.07, pace: '9:31', avgHR: 150, maxHR: 165, notes: '', activityType: 'run' },
  { id: '6', dayOfWeek: 'Wednesday', date: '2026-07-08', distance: 1.08, pace: '7:30', avgHR: 154, maxHR: 179, notes: '', activityType: 'speedwork' },
  { id: '7', dayOfWeek: 'Wednesday', date: '2026-07-08', distance: 3, pace: '10x15 hills', avgHR: 139, maxHR: 171, notes: '10x15 hills', activityType: 'speedwork' },
  { id: '8', dayOfWeek: 'Sunday', date: '2026-07-12', distance: 5.19, pace: '9:54', avgHR: 148, maxHR: 162, notes: '', activityType: 'run' },
  { id: '9', dayOfWeek: 'Monday', date: '2026-07-13', distance: 1.88, pace: '7:34', avgHR: 161, maxHR: 176, notes: '', activityType: 'speedwork' },
  { id: '10', dayOfWeek: 'Monday', date: '2026-07-13', distance: 2, pace: '10x15 hills', avgHR: 136, maxHR: 166, notes: '10x15 hills', activityType: 'speedwork' },
  { id: '11', dayOfWeek: 'Friday', date: '2026-07-17', distance: 1.11, pace: '10:11', avgHR: 132, maxHR: 141, notes: '', activityType: 'run' },
  { id: '12', dayOfWeek: 'Friday', date: '2026-07-17', distance: 3.45, pace: '10:06', avgHR: 151, maxHR: 159, notes: '', activityType: 'run' },
  { id: '13', dayOfWeek: 'Saturday', date: '2026-07-18', distance: 5, pace: '8:54', avgHR: 151, maxHR: 169, notes: '', activityType: 'run' },
  { id: '14', dayOfWeek: 'Sunday', date: '2026-07-19', distance: 3.02, pace: '9:03', avgHR: 153, maxHR: 180, notes: '', activityType: 'run' },
  { id: '15', dayOfWeek: 'Monday', date: '2026-07-20', distance: null, pace: null, avgHR: null, maxHR: null, notes: 'Tennis', activityType: 'tennis' },
  { id: '16', dayOfWeek: 'Tuesday', date: '2026-07-21', distance: 1.6, pace: '8:33', avgHR: 156, maxHR: 163, notes: '1.5 mile warmup', activityType: 'run' },
  { id: '17', dayOfWeek: 'Tuesday', date: '2026-07-21', distance: 2.4, pace: '5:12', avgHR: 142, maxHR: 181, notes: '5x400s with walk inbetween (1:24, 1:16 x 3, 1:18)', activityType: 'speedwork' },
  { id: '18', dayOfWeek: 'Wednesday', date: '2026-07-22', distance: 7.05, pace: '10:16', avgHR: 153, maxHR: 167, notes: 'crushed', activityType: 'run' },
  { id: '19', dayOfWeek: 'Thursday', date: '2026-07-23', distance: null, pace: null, avgHR: null, maxHR: null, notes: 'tennis', activityType: 'tennis' },
  { id: '20', dayOfWeek: 'Friday', date: '2026-07-24', distance: 4.44, pace: '9:22', avgHR: 156, maxHR: 176, notes: 'was fuckin tired but grinded. not even sure if smart', activityType: 'run' },
  { id: '21', dayOfWeek: 'Saturday', date: '2026-07-25', distance: 2.67, pace: '9:17', avgHR: 145, maxHR: 158, notes: 'easy day 7am run down and back a little sore/tired', activityType: 'run' },
  { id: '22', dayOfWeek: 'Monday', date: '2026-07-27', distance: 2.25, pace: null, avgHR: null, maxHR: null, notes: '1 mile warmup, 1 400, 6 200s, 4 100s', activityType: 'speedwork' },
  { id: '23', dayOfWeek: 'Tuesday', date: '2026-07-28', distance: 3.4, pace: '9:01', avgHR: 154, maxHR: null, notes: '', activityType: 'run' },
  { id: '24', dayOfWeek: 'Friday', date: '2026-07-31', distance: 4.74, pace: '9:17', avgHR: 149, maxHR: 170, notes: 'legs felt heavy as fucking shit and generally awful', activityType: 'run' },
  { id: '25', dayOfWeek: 'Saturday', date: '2026-08-01', distance: 2.57, pace: '9:33', avgHR: 137, maxHR: 162, notes: '', activityType: 'run' },
  { id: '26', dayOfWeek: 'Saturday', date: '2026-08-01', distance: 1.67, pace: '7:49', avgHR: 168, maxHR: 181, notes: '', activityType: 'speedwork' },
  { id: '27', dayOfWeek: 'Sunday', date: '2026-08-02', distance: 2.16, pace: '9:35', avgHR: 147, maxHR: 159, notes: '', activityType: 'run' },
  { id: '28', dayOfWeek: 'Monday', date: '2026-08-03', distance: 0, pace: null, avgHR: null, maxHR: null, notes: 'Peloton 1 hr at 203 avg watts', activityType: 'cycling' },
  { id: '29', dayOfWeek: 'Tuesday', date: '2026-08-04', distance: 3, pace: null, avgHR: null, maxHR: 181, notes: '1 mile warmup, 6 400s, 4 200s - 400s (80, 81, 79, 80, 80, 81) 200s (38, 40, 33, 37)', activityType: 'speedwork' },
  { id: '30', dayOfWeek: 'Wednesday', date: '2026-08-05', distance: 5.84, pace: '9:14', avgHR: 155, maxHR: 165, notes: '', activityType: 'run' },
  { id: '31', dayOfWeek: 'Saturday', date: '2026-08-08', distance: 2.76, pace: '9:41', avgHR: 154, maxHR: 169, notes: '', activityType: 'run' },
  { id: '32', dayOfWeek: 'Sunday', date: '2026-08-09', distance: 5.25, pace: '10:05', avgHR: 145, maxHR: 161, notes: '', activityType: 'run' },
  { id: '33', dayOfWeek: 'Sunday', date: '2026-08-09', distance: 4.95, pace: '9:42', avgHR: 151, maxHR: 162, notes: '', activityType: 'run' },
  { id: '34', dayOfWeek: 'Tuesday', date: '2026-08-11', distance: 5.85, pace: '9:18', avgHR: 153, maxHR: null, notes: '', activityType: 'run' },
  { id: '35', dayOfWeek: 'Wednesday', date: '2026-08-12', distance: 4.57, pace: '10:44', avgHR: 138, maxHR: null, notes: '', activityType: 'run' },
  { id: '36', dayOfWeek: 'Thursday', date: '2026-08-13', distance: 3, pace: '8:21', avgHR: 157, maxHR: 181, notes: '', activityType: 'run' },
  { id: '37', dayOfWeek: 'Friday', date: '2026-08-14', distance: 5.79, pace: null, avgHR: null, maxHR: null, notes: '', activityType: 'run' },
  { id: '38', dayOfWeek: 'Friday', date: '2026-08-14', distance: 2.88, pace: null, avgHR: null, maxHR: null, notes: '', activityType: 'run' },
  { id: '39', dayOfWeek: 'Sunday', date: '2026-08-16', distance: 4.29, pace: '10:12', avgHR: 155, maxHR: 173, notes: '', activityType: 'run' },
  { id: '40', dayOfWeek: 'Monday', date: '2026-08-17', distance: 4.51, pace: '10:31', avgHR: 149, maxHR: 171, notes: '', activityType: 'run' },
  { id: '41', dayOfWeek: 'Tuesday', date: '2026-08-18', distance: 2.25, pace: '9:49', avgHR: 148, maxHR: 161, notes: '', activityType: 'run' },
  { id: '42', dayOfWeek: 'Wednesday', date: '2026-08-19', distance: 5.4, pace: '9:43', avgHR: 145, maxHR: 150, notes: 'treadmill', activityType: 'run' },
  { id: '43', dayOfWeek: 'Thursday', date: '2026-08-20', distance: 5, pace: null, avgHR: null, maxHR: null, notes: 'treadmill 400s 86 seconds 90 sec rest', activityType: 'speedwork' },
  { id: '44', dayOfWeek: 'Friday', date: '2026-08-21', distance: 2.42, pace: '9:49', avgHR: 142, maxHR: 150, notes: '', activityType: 'run' },
  { id: '45', dayOfWeek: 'Saturday', date: '2026-08-22', distance: 9.2, pace: '9:48', avgHR: 142, maxHR: 147, notes: 'treadmill', activityType: 'run' },
  { id: '46', dayOfWeek: 'Tuesday', date: '2026-08-25', distance: 4.53, pace: '8:27', avgHR: 158, maxHR: 177, notes: 'altitude training works', activityType: 'run' },
  { id: '47', dayOfWeek: 'Thursday', date: '2026-08-27', distance: 3.43, pace: '9:36', avgHR: 153, maxHR: 166, notes: 'Don\'t run when sick', activityType: 'run' },
  { id: '48', dayOfWeek: 'Saturday', date: '2026-08-29', distance: null, pace: null, avgHR: null, maxHR: null, notes: 'sick', activityType: 'rest' },
  { id: '49', dayOfWeek: 'Sunday', date: '2026-08-30', distance: null, pace: null, avgHR: null, maxHR: null, notes: 'sick', activityType: 'rest' },
  { id: '50', dayOfWeek: 'Monday', date: '2026-08-31', distance: 5.68, pace: '9:31', avgHR: 153, maxHR: 172, notes: 'still kinda sick', activityType: 'run' },
  { id: '51', dayOfWeek: 'Tuesday', date: '2026-09-01', distance: 4.46, pace: '8:56', avgHR: 158, maxHR: 173, notes: 'felt better', activityType: 'run' },
  { id: '52', dayOfWeek: 'Wednesday', date: '2026-09-02', distance: null, pace: null, avgHR: null, maxHR: null, notes: '30 min cycle', activityType: 'cycling' },
  { id: '53', dayOfWeek: 'Thursday', date: '2026-09-03', distance: 5.45, pace: '9:20', avgHR: 158, maxHR: 170, notes: '', activityType: 'run' },
  { id: '54', dayOfWeek: 'Friday', date: '2026-09-04', distance: 5, pace: '10:10', avgHR: 145, maxHR: 155, notes: 'easy southold work', activityType: 'run' },
  { id: '55', dayOfWeek: 'Saturday', date: '2026-09-05', distance: 10.09, pace: '10:18', avgHR: 143, maxHR: 155, notes: 'long days', activityType: 'run' },
  { id: '56', dayOfWeek: 'Sunday', date: '2026-09-06', distance: 4.09, pace: '9:50', avgHR: 143, maxHR: 158, notes: 'mission complete', activityType: 'run' },
  { id: '57', dayOfWeek: 'Monday', date: '2026-09-07', distance: 2, pace: null, avgHR: null, maxHR: 179, notes: 'speed work', activityType: 'speedwork' },
  { id: '58', dayOfWeek: 'Tuesday', date: '2026-09-08', distance: 5.66, pace: '8:55', avgHR: 158, maxHR: 177, notes: '', activityType: 'run' },
  { id: '59', dayOfWeek: 'Friday', date: '2026-09-11', distance: 3.21, pace: '8:40', avgHR: 153, maxHR: 174, notes: '', activityType: 'run' },
  { id: '60', dayOfWeek: 'Saturday', date: '2026-09-12', distance: 4.46, pace: '8:24', avgHR: 158, maxHR: 174, notes: '', activityType: 'run' },
  { id: '61', dayOfWeek: 'Sunday', date: '2026-09-13', distance: 3.25, pace: '8:29', avgHR: 156, maxHR: 173, notes: '', activityType: 'run' },
  { id: '62', dayOfWeek: 'Monday', date: '2026-09-14', distance: 2.67, pace: '9:52', avgHR: 145, maxHR: 157, notes: 'morning run before train to NYC legs felt like shit', activityType: 'run' },
  { id: '63', dayOfWeek: 'Tuesday', date: '2026-09-15', distance: 7.06, pace: '9:03', avgHR: 151, maxHR: 165, notes: '', activityType: 'run' },
  { id: '64', dayOfWeek: 'Wednesday', date: '2026-09-16', distance: 3.6, pace: '9:22', avgHR: 150, maxHR: 163, notes: 'on treadmill not sure fuckin how', activityType: 'run' },
  { id: '65', dayOfWeek: 'Thursday', date: '2026-09-17', distance: 4.59, pace: '9:30', avgHR: 152, maxHR: 166, notes: 'outside run psw', activityType: 'run' },
  { id: '66', dayOfWeek: 'Saturday', date: '2026-09-19', distance: 1, pace: '5:51', avgHR: 175, maxHR: 187, notes: '', activityType: 'speedwork' },
  { id: '67', dayOfWeek: 'Monday', date: '2026-09-21', distance: 4.33, pace: '8:33', avgHR: 157, maxHR: 168, notes: '', activityType: 'run' },
  { id: '68', dayOfWeek: 'Tuesday', date: '2026-09-22', distance: 4, pace: null, avgHR: 154, maxHR: 168, notes: '4x200 at 42s + 4 min jog recovery on uncalibrated treadmill', activityType: 'speedwork' },
  { id: '69', dayOfWeek: 'Wednesday', date: '2026-09-23', distance: 4.09, pace: '9:25', avgHR: 151, maxHR: 166, notes: 'easy chill run w/ headphones lots of fun', activityType: 'run' },
  { id: '70', dayOfWeek: 'Thursday', date: '2026-09-24', distance: 2.5, pace: '6:00', avgHR: 160, maxHR: 184, notes: '', activityType: 'speedwork' },
  { id: '71', dayOfWeek: 'Friday', date: '2026-09-25', distance: 5.67, pace: '8:48', avgHR: 155, maxHR: 170, notes: '', activityType: 'run' },
  { id: '72', dayOfWeek: 'Saturday', date: '2026-09-26', distance: 4, pace: '7:41', avgHR: 172, maxHR: 175, notes: '20 min at 7:41 pace', activityType: 'run' },
  { id: '73', dayOfWeek: 'Monday', date: '2026-09-28', distance: 4.6, pace: '9:17', avgHR: 148, maxHR: 169, notes: '', activityType: 'run' },
  { id: '74', dayOfWeek: 'Tuesday', date: '2026-09-29', distance: 5.8, pace: '7:49', avgHR: 165, maxHR: 179, notes: 'pushed it good', activityType: 'run' },
  { id: '75', dayOfWeek: 'Thursday', date: '2026-10-01', distance: 4.75, pace: '9:35', avgHR: 152, maxHR: 169, notes: '', activityType: 'run' },
  { id: '76', dayOfWeek: 'Friday', date: '2026-10-02', distance: 1.01, pace: '10:08', avgHR: 139, maxHR: 146, notes: '', activityType: 'run' },
  { id: '77', dayOfWeek: 'Monday', date: '2026-10-05', distance: 4.34, pace: '10:39', avgHR: 140, maxHR: 154, notes: '', activityType: 'run' },
  { id: '78', dayOfWeek: 'Tuesday', date: '2026-10-06', distance: 4.35, pace: '10:46', avgHR: 134, maxHR: 149, notes: '', activityType: 'run' },
  { id: '79', dayOfWeek: 'Wednesday', date: '2026-10-07', distance: 5, pace: null, avgHR: 151, maxHR: 171, notes: '3x8 min at 7 speed (threshold) 2 min recovery at 5 speed', activityType: 'speedwork' },
  { id: '80', dayOfWeek: 'Thursday', date: '2026-10-08', distance: 4.34, pace: '10:48', avgHR: 136, maxHR: 157, notes: 'fucked up my HR by being a jackass on a hill', activityType: 'run' },
  { id: '81', dayOfWeek: 'Friday', date: '2026-10-09', distance: 4.02, pace: '7:48', avgHR: 162, maxHR: 175, notes: '', activityType: 'run' },
  { id: '82', dayOfWeek: 'Saturday', date: '2026-10-10', distance: 4.65, pace: '10:45', avgHR: 134, maxHR: 140, notes: 'treadmill 50 min', activityType: 'run' },
  { id: '83', dayOfWeek: 'Monday', date: '2026-10-12', distance: 4.28, pace: '11:03', avgHR: 135, maxHR: 154, notes: '', activityType: 'run' },
  { id: '84', dayOfWeek: 'Tuesday', date: '2026-10-13', distance: 5, pace: '8:00', avgHR: 153, maxHR: 163, notes: 'sub threshold 4x8', activityType: 'speedwork' },
  { id: '85', dayOfWeek: 'Wednesday', date: '2026-10-14', distance: 4.34, pace: '11:11', avgHR: 136, maxHR: 149, notes: '', activityType: 'run' },
  { id: '86', dayOfWeek: 'Thursday', date: '2026-10-15', distance: null, pace: null, avgHR: null, maxHR: null, notes: '1:15 min of tennis', activityType: 'tennis' },
  { id: '87', dayOfWeek: 'Friday', date: '2026-10-16', distance: 4.34, pace: '10:30', avgHR: 133, maxHR: 137, notes: '', activityType: 'run' },
  { id: '88', dayOfWeek: 'Saturday', date: '2026-10-17', distance: 13.31, pace: '9:49', avgHR: 144, maxHR: 158, notes: 'yeet', activityType: 'run' },
  { id: '89', dayOfWeek: 'Sunday', date: '2026-10-18', distance: null, pace: null, avgHR: null, maxHR: null, notes: '2:00 of hoops', activityType: 'basketball' },
];

export function saveRunningPlan(plan: RunningPlan): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

export function loadRunningPlan(): RunningPlan | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as RunningPlan;
  } catch {
    return null;
  }
}

export function clearRunningPlan(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getEntriesForDate(entries: RunEntry[], date: string): RunEntry[] {
  return entries.filter(e => e.date === date);
}

export function calculateWeeklyStats(entries: RunEntry[]): WeeklyStats[] {
  const weekMap = new Map<string, RunEntry[]>();

  entries.forEach(entry => {
    const date = new Date(entry.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, []);
    }
    weekMap.get(weekKey)!.push(entry);
  });

  const stats: WeeklyStats[] = [];
  let weekNum = 1;

  const sortedWeeks = Array.from(weekMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  for (const [weekStart, weekEntries] of sortedWeeks) {
    const runs = weekEntries.filter(e => e.distance && e.distance > 0);
    const totalMiles = runs.reduce((sum, e) => sum + (e.distance || 0), 0);

    const paces = runs.filter(e => e.pace && !e.pace.includes('x')).map(e => e.pace!);
    const avgPace = paces.length > 0 ? calculateAvgPace(paces) : null;

    const hrs = runs.filter(e => e.avgHR).map(e => e.avgHR!);
    const avgHR = hrs.length > 0 ? Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length) : null;

    const endDate = new Date(weekStart);
    endDate.setDate(endDate.getDate() + 6);

    stats.push({
      weekNumber: weekNum++,
      startDate: weekStart,
      endDate: endDate.toISOString().split('T')[0],
      totalMiles: Math.round(totalMiles * 100) / 100,
      runCount: runs.length,
      avgPace,
      avgHR,
    });
  }

  return stats;
}

function calculateAvgPace(paces: string[]): string {
  const totalSeconds = paces.reduce((sum, pace) => {
    const [min, sec] = pace.split(':').map(Number);
    return sum + min * 60 + (sec || 0);
  }, 0);
  const avgSeconds = Math.round(totalSeconds / paces.length);
  const mins = Math.floor(avgSeconds / 60);
  const secs = avgSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getTotalStats(entries: RunEntry[]) {
  const runs = entries.filter(e => e.distance && e.distance > 0);
  const totalMiles = runs.reduce((sum, e) => sum + (e.distance || 0), 0);
  const longestRun = Math.max(...runs.map(e => e.distance || 0));
  const totalRuns = runs.length;

  const paces = runs.filter(e => e.pace && !e.pace.includes('x')).map(e => e.pace!);
  const avgPace = paces.length > 0 ? calculateAvgPace(paces) : null;

  const hrs = runs.filter(e => e.avgHR).map(e => e.avgHR!);
  const avgHR = hrs.length > 0 ? Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length) : null;

  return {
    totalMiles: Math.round(totalMiles * 100) / 100,
    totalRuns,
    longestRun,
    avgPace,
    avgHR,
  };
}
