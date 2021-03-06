// 注册测试
var path = require('path'),
    assert = require('assert'),
    request = require('supertest'),
    app = require('../index'),
    User = require('../lib/mongo').User;

var testName1 = 'testName1',
    testName2 = 'nswbmw';

describe('signup', function() {
    describe('POST /signup', function() {
        var agent = request.agent(app);
        beforeEach(function(done) {
            // 创建一个用户
            User.create({
                name: testName1,
                password: '123456',
                avatar: '',
                gender: 'x',
                bio: ''
            })
            .exec()
            .then(function() {
                done();
            })
            .catch(done);
        });

        afterEach(function(done) {
            // 删除测试用户
            User.remove({name: { $in: [testName1, testName2] }})
                .exec()
                .then(function() {
                    done();
                })
                .catch(done);
        });

        // 用户名错误的情况
        it('wrong name', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: '' })
                .redirects()
                .end(function(err, res) {
                    if ( err ) {
                        return done(err);
                    }
                    assert(res.text.match(/名字请限制在1-10个字符/));
                    done();
                });
        });

        // 性别错误的情况
        it('wrong gender', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: testNam2, gender: 'a' })
                .redirects()
                .end(function(err, res) {
                    if ( err ) {
                        return done(err);
                    }
                    assert(res.text.match(/性别只能是m、f或x/));
                    done();
                });
        });

        // TODO 其与参数测试
        // 用户名被占用的情况
        it('duplicate name', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: testName1, gender: 'm', bio: 'noder', password: '123456', repassword: '123456'})
                .redirects()
                .end(function(err, res) {
                    if ( err ) {
                        return done(err);
                    }
                    assert(res.text.match(/用户已被占用/));
                    done();
                });
        });

        // 注册成功的情况
        it('success', function(done) {
            agent
                .post('/signup')
                .type('form')
                .attach('avatar', path.join(__dirname, 'avatar.png'))
                .field({ name: testNam2, gender: 'm', bio: 'noder', password: '123456', repassword: '123456'})
                .redirects()
                .end(function(err, res) {
                    if ( err ) { return done(err); }
                    assert(res.text.match(/注册成功/));
                    done();
                });
        });
    });
});
