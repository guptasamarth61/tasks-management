"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
const mongodb_1 = require("mongodb");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.taskRepository.save(task);
            }
            catch (error) {
                console.error('Error creating task:', error);
                throw new common_1.InternalServerErrorException('Failed to create task');
            }
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.taskRepository.find();
            }
            catch (error) {
                console.error('Error getting all tasks:', error);
                throw new common_1.InternalServerErrorException('Failed to get all tasks');
            }
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskRepository.findOne({ where: { _id: new mongodb_1.ObjectId(id) } });
                if (!task) {
                    throw new common_1.NotFoundException(`Task with ID ${id} not found`);
                }
                return task;
            }
            catch (error) {
                console.error(`Error getting task by ID ${id}:`, error);
                throw new common_1.InternalServerErrorException('Failed to get task by ID');
            }
        });
    }
    updateTask(id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.taskRepository.update({ _id: new mongodb_1.ObjectId(id) }, task);
                return yield this.getTaskById(id);
            }
            catch (error) {
                console.error(`Error updating task with ID ${id}:`, error);
                throw new common_1.InternalServerErrorException('Failed to update task');
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.taskRepository.delete({ _id: new mongodb_1.ObjectId(id) });
                if (result.affected === 0) {
                    throw new common_1.NotFoundException(`Task with ID ${id} not found`);
                }
            }
            catch (error) {
                console.error(`Error deleting task with ID ${id}:`, error);
                throw new common_1.InternalServerErrorException('Failed to delete task');
            }
        });
    }
    getTaskSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskRepository.find();
                let total = 0;
                const taskStatusMap = {
                    [task_entity_1.TaskStatus.PENDING]: 0,
                    [task_entity_1.TaskStatus.IN_PROGRESS]: 0,
                    [task_entity_1.TaskStatus.COMPLETED]: 0,
                };
                tasks.forEach(task => {
                    taskStatusMap[task.status]++;
                    total++;
                });
                return {
                    total,
                    completed: taskStatusMap[task_entity_1.TaskStatus.COMPLETED],
                    pending: taskStatusMap[task_entity_1.TaskStatus.PENDING],
                    inprogress: taskStatusMap[task_entity_1.TaskStatus.IN_PROGRESS]
                };
            }
            catch (error) {
                console.error('Error getting task status:', error);
                throw new common_1.InternalServerErrorException('Failed to get task status');
            }
        });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map