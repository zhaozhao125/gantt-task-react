import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "Research",
      id: "Task 1",
      progress: 25,
      dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth() , 8, 0,0),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth() , 30, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSample",
    },
    {
      // TODO: start 和 end 为null 时ts校验不通过，尝试在public-types中修改Task 的 interface， 但是文件保存不上
      // @ts-ignore
      start: null,
      // @ts-ignore
      end: null,
      name: "Party Time",
      id: "Task 9",
      progress: 0,
      // isDisabled: true,
      type: "task",
    },
    {
      // TODO: start 和 end 为null 时ts校验不通过，尝试在public-types中修改Task 的 interface， 但是文件保存不上
      // @ts-ignore
      start: null,
      // @ts-ignore
      end: null,
      name: "Party Time",
      id: "Task 11",
      progress: 0,
      // isDisabled: true,
      type: "task",
    },
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const currentDate = new Date();
  const projectTasks = tasks.filter(t => t.project === projectId);
  // 当startTime\endTime为空是处理
  let start = projectTasks[0].start || currentDate;
  let end = projectTasks[0].end || currentDate;
  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    const invalidStart = task.start ? task.start : currentDate;
    const invalidEnd = task.end ? task.end : currentDate;
    if (start.getTime() > invalidStart.getTime()) {
      start = invalidStart;
    }
    if (end.getTime() < invalidEnd.getTime()) {
      end = invalidEnd;
    }
  }
  return [start, end];
}
