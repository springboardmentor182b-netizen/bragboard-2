import React from "react";

// BragBoard Admin - Resolving Reports JSX File
// Ready to use as .jsx component

export default function BragBoardAdminResolvingReports() {
  const reports = [
    {
      id: 1,
      name: "John Doe",
      dept: "Marketing",
      time: "2 hrs ago",
      message: "Completed the new campaign ahead of schedule. Excellent teamwork!",
    },
    {
      id: 2,
      name: "Jane Smith",
      dept: "Sales",
      time: "5 hrs ago",
      message: "Exceeded monthly sales target and helped teammates achieve their goals.",
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-[#F3F6FF] flex flex-col">
      <div className="flex w-full h-screen">
        {/* Sidebar */}
        <aside className="w-[440px] h-full p-[40px_30px] bg-[#5B6CFF] flex flex-col gap-5">
          <h1 className="text-white font-bold text-[30px] leading-[36px] mb-[50px]">BragBoard Admin</h1>

          <div className="flex flex-col gap-3">
            <button className="text-left p-[14px_18px] rounded-[12px] w-full text-white font-medium text-[17px]">Admin Dashboard</button>
            <button className="text-left p-[14px_18px] rounded-[12px] w-full bg-[#4456E6] text-white font-medium text-[17px]">Resolving Reports</button>
            <button className="text-left p-[14px_18px] rounded-[12px] w-full text-white font-medium text-[17px]">Export Reports</button>
            <button className="text-left p-[14px_18px] rounded-[12px] w-full text-white font-medium text-[17px]">Shout-out Management</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-[60px_50px_531.91px] overflow-auto">
          <h2 className="text-black font-bold text-[30px] leading-[36px]">Resolving Reports</h2>

          <div className="mt-7 space-y-6">
            {reports.map((r) => (
              <article key={r.id} className="w-[900px] bg-white rounded-[18px] shadow-[0_6px_20px_rgba(0,0,0,0.12)] p-7">
                <div className="flex justify-between items-start mb-2">
                  <div className="w-[164px]">
                    <div className="font-bold text-[20px] text-[#222222]">{r.name}</div>
                    <div className="text-[15px] text-[#444444]">Department: {r.dept}</div>
                  </div>
                  <div className="w-[58px] text-[13px] text-[#777777]">{r.time}</div>
                </div>

                <p className="text-[15px] text-[#555555] mb-3">{r.message}</p>

                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-[8px] bg-[#5B6CFF] text-white text-[14px]">Resolve</button>
                  <button className="px-4 py-2 rounded-[8px] bg-[#FF5B5B] text-white text-[14px]">Delete</button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
