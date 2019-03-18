const TaskService = require('../../models/TaskService');
//const sinon = require('sinon');
const sampleData = require('../../utils/sampleTestingData');
const { taskData, taskDataFromDB } = sampleData;
//require('sinon-mongoose');
//const Task = require('../../models/Task');

describe('taskRouteUtils', () => {
   it('has a module', () => {
      expect(TaskService).toBeDefined();
   });

   describe('various listTasks test', () => {
      let mockSort, MockModel, taskService;
      beforeAll(() => {
         /*  const find = sandbox.stub(Task, 'find').callsFake(() => {
            return {
               sort: sinon.stub().returns(taskDataFromDB)
            };
         });*/
         mockSort = jest.fn();
         mockSort.mockResolvedValue(taskDataFromDB);
         MockModel = {
            find: jest.fn(() => {
               return {
                  sort: mockSort
               };
            })
         };
         taskService = TaskService(MockModel);
      });

      beforeEach(() => {
         mockSort.mockClear();
         MockModel.find.mockClear();
      });
      /* it('lists a Tasks - sinon implementation', async () => {
         sinon
            .mock(Task)
            .expects('find')
            .chain('sort')
            .withArgs('-_id')
            .resolves(taskDataFromDB);

         Task.find()
            .sort('-_id')
            .then(result => {
               //console.log(result);
               expect(result).toMatchObject(taskDataFromDB);
            });
      }); */

      it('lists a Tasks', async () => {
         const res = await taskService.listTasks();
         expect(res).toEqual(taskDataFromDB);
         expect(MockModel.find).toHaveBeenCalledTimes(1);
         expect(mockSort).toHaveBeenCalledTimes(1);
      });
      it('listTasksWithConditions -- lists a Tasks that match certain conditions', async () => {
         const res = await taskService.listTasksWithConditions({ czyPrzeczytano: false });
         expect(res).toEqual(taskDataFromDB);
         expect(MockModel.find).toHaveBeenCalledTimes(1);
         expect(mockSort).toHaveBeenCalledTimes(1);
      });
      it('listTasksFromXDays -- lists a Tasks from x last days', async () => {
         const res = await taskService.listTasksFromXDays('5');
         expect(res).toEqual(taskDataFromDB);
         expect(MockModel.find).toHaveBeenCalledTimes(1);
         expect(mockSort).toHaveBeenCalledTimes(1);
      });
   });
   describe('other listTasks test', () => {
      it('listXTasks -- lists x last Tasks', async () => {
         const mockLimit = jest.fn();
         mockLimit.mockResolvedValue(taskDataFromDB);
         const MockModel = {
            find: jest.fn(() => {
               return {
                  sort: jest.fn(() => {
                     return {
                        limit: mockLimit
                     };
                  })
               };
            })
         };
         const taskService = TaskService(MockModel);
         const res = await taskService.listXTasks('5');
         expect(res).toEqual(taskDataFromDB);
         expect(mockLimit).toHaveBeenCalledTimes(1);
      });

      it('findTaskById -- finds task with given ID', async () => {
         const mockFindById = jest.fn();
         mockFindById.mockResolvedValue(taskDataFromDB);
         const MockModel = {
            findById: mockFindById
         };
         const taskService = TaskService(MockModel);
         const res = await taskService.findTaskById(taskDataFromDB._id);
         expect(res).toEqual(taskDataFromDB);
         expect(mockFindById).toHaveBeenCalledTimes(1);
      });
   });

   describe('createTask test', () => {
      beforeAll(() => {});
      it('creates a Task', async () => {
         const save = jest.fn();
         let name, args;
         const MockModel = function(data) {
            name = data.imieINazwisko;
            args = data.args;

            return {
               ...data,
               save
            };
         };

         const taskService = TaskService(MockModel);
         taskService.createTask(taskData);
         expect(save).toBeCalled();
         expect(name).toBe(taskData.imieINazwisko);
         expect(args).toBe(taskData.args);
      });
   });
});
