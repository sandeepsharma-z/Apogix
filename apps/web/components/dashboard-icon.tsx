export function DashboardIcon({kind}:{kind:string}) {
 const paths:Record<string,string>={
 Overview:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
 Calendar:'M4 5h16v16H4z M8 3v4 M16 3v4 M4 11h16',
 Posts:'M6 3h9l4 4v14H6z M14 3v5h5 M9 12h7 M9 16h5',
 Approvals:'M21 12a9 9 0 1 1-5-8 M8 11l4 4 9-10',
 'Media library':'M3 3h18v18H3z M3 17l6-6 5 5 3-3 4 4 M15 7h.01',
 Analytics:'M4 3v18h17 M9 16v-5 M14 16V7 M19 16V4',
 Connections:'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2',
 Customers:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M17 4a4 4 0 0 1 0 7 M22 21v-2a4 4 0 0 0-3-4',
 Support:'M3 14v-3a9 9 0 0 1 18 0v3 M3 11h4v8H3z M17 11h4v8h-4z M21 19v2h-7',
 'Publishing jobs':'M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l3 3 M15 15l3 3 M6 18l3-3 M15 9l3-3',
 Bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
 Sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1 1 M18 18l1 1 M5 19l1-1 M18 6l1-1',
 Moon:'M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10',
 Menu:'M4 6h16 M4 12h16 M4 18h16', Close:'M6 6l12 12 M6 18 18 6', Plus:'M12 5v14 M5 12h14', Left:'m14 6-6 6 6 6', Right:'m10 6 6 6-6 6',
 };
 return <svg className="db-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]||paths.Posts}/></svg>;
}
