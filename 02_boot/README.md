com.example.boot

- controller ：控制层
- service : 业务层，中间对实体对象进行处理，主要是业务逻辑代码
- dao : 存放操作数据库的接口(持久层)，包含了增删查改等函数，关键字搜索需要额外添加
- dto : 存放数据传输对象，用于接收从前端传来的json对象。比如注册时，注册的信息可以用一个 dto 对象来接收
- po : 存放与数据库中表相对应的java实体对象
- vo : 存放业务返回结果对象，需要进行序列化为json。


resources

- mapper : 存放mapper.xml 文件

用到的插件：
mybatis
mybatis generator

