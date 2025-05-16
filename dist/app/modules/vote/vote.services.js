"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteServices = void 0;
const Prisma_1 = __importDefault(require("../../../shared/Prisma"));
const createVoteIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const voteData = req.body;
    console.log(voteData);
    const result = yield Prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        return yield transactionClient.vote.create({
            data: {
                voteType: voteData.voteType,
                userId: voteData.userId,
                ideaId: voteData.ideaId,
            },
        });
    }));
    return result;
});
const getAllVotesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.vote.findMany({});
    return result;
});
const getSingleVoteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.vote.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const deleteVoteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.vote.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield Prisma_1.default.$transaction((transactionClent) => __awaiter(void 0, void 0, void 0, function* () {
        const voteDeletedData = yield transactionClent.vote.delete({
            where: {
                id,
            },
        });
        return voteDeletedData;
    }));
    return result;
});
exports.VoteServices = {
    createVoteIntoDB,
    getAllVotesFromDB,
    getSingleVoteFromDB,
    deleteVoteFromDB,
};
