// 数据库操作
var config = require('config-lite');
var Mongolass = require('mongolass');
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

var mongolass = new Mongolass();
// 连接数据库
mongolass.connect(config.mongodb);

// 根据 id 生成创建时间 create_at
mongolass.plugin('addCreateAt', {
    afterFind: function(results) {
        results.forEach(function(item) {
            item.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFineOne: function(result) {
        if ( result ) {
            result.create_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

// 用户 定义表的schema
exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});
// 根据用户名找到用户，用户名全局唯一 类似设置主键
exports.User.index({ name: 1 }, { unique: true }).exec();

// 文章 表schema
exports.Post = mongolass.model('Post', {
    author: { type: Mongolass.Types.ObjectId },
    title: { type: 'string' },
    content: { type: 'string' },
    pv: { type: 'number' }
});
// 按创建时间降序查看用户的文章列表
exports.Post.index({ author: 1, _id: -1 }).exec();

exports.Comment = mongolass.model('Comment', {
    author: { type: Mongolass.Types.ObjectId },
    content: { type: 'string' },
    postId: { type: Mongolass.Types.ObjectId }
});
// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ postId: 1, _id: 1 }).exec();
// 通过用户 id 和留言 id 删除一个留言
exports.Comment.index({ author: 1, _id: 1 }).exec();