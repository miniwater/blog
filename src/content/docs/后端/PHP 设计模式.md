# PHP 设计模式

详细内容：[https://github.com/TIGERB/easy-tips](https://github.com/TIGERB/easy-tips)

面向对象的设计原则[](https://github.com/TIGERB/easy-tips/blob/master/patterns/thought.md#%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99)

* 对接口编程，不要对实现编程
* 使用对象之间的组合，减少对继承的使用
* 抽象用于不同的事物，而接口用于事物的行为

设计模式的设计原则[](https://github.com/TIGERB/easy-tips/blob/master/patterns/thought.md#%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E7%9A%84%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99)

* 开闭原则：对扩展开放，对修改封闭
  * mean: 实例的内部不可修改，但可以增加新功能
* 依赖倒转：对接口编程，依赖于抽象而不依赖于具体
  * mean: 就是把公共的拿出来，定义成抽象类、接口、抽象方法，然后大家再去实现这个抽 象，实现的方法各有不同，各个实体相互独立没有依赖，各个实体离开谁都能活
* 接口隔离：使用多个接口，而不是对一个接口编程，去依赖降低耦合
  * mean: 就是抽象再抽象
* 最少知道：减少内部依赖，尽可能的独立
  * mean: 实现依赖注入容器，把依赖的实体注入到一个实例（所谓容器）
* 合成复用：多个独立的实体合成聚合，而不是使用继承
  * mean：尽可能不用继承，使用以上三种方式构成代码结构
* 里氏代换：超类（父类）出现的地方，派生类（子类）都可以出现
  * mean：能用父类实现的子类也能实现

简单设计原则[](https://github.com/TIGERB/easy-tips/blob/master/patterns/thought.md#%E7%AE%80%E5%8D%95%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99)

* 通过所有测试:及需求为上
* 尽可能的消除重复：高内聚低耦合
* 尽可能的清晰表达：可读性
* 更少代码元素：常量，变量，函数，类，包 …… 都属于代码元素，降低复杂性
* 以上四个原则的重要程度依次降低

> 核心：高内聚松耦合（单一职责），外部依赖，实体对抽象编程，抽象就是分层

## 创建模式

### 单例模式

```php
<?php
 
class Singleton
{
  /**
   * 自身实例
   * 
   * @var object
   */
  private static $_instance;
 
  /**
   * 魔法方法
   * 禁止clone对象
   * 
   * @return string
   */
  public function __clone()
  {
    echo 'clone is forbidden';
  }
 
  /**
   * 获取实例
   * 
   * @return object
   */
  public static function getInstance()
  {
    if (!self::$_instance instanceof self) {
      self::$_instance = new self;
    }
    return self::$_instance;
  }
 
  /**
   * 测试方法
   * 
   * @return string
   */
  public function test()
  {
    echo "这是个测试 \n";
  }
}
 
// 获取单例
$instance = Singleton::getInstance();
$instance->test();
 
// clone对象试试
$instanceClone = clone $instance;
```

### 工厂模式

```php
<?php
/**
 * 创建型模式
 * 工厂方法模式和抽象工厂模式的核心区别
 * 工厂方法模式利用继承，抽象工厂模式利用组合
 * 工厂方法模式产生一个对象，抽象工厂模式产生一族对象
 * 工厂方法模式利用子类创造对象，抽象工厂模式利用接口的实现创造对象
 * 工厂方法模式可以退化为简单工厂模式(非23中GOF)
 *
 * php工厂模式
 * @author  TIGERB <https://github.com/TIGERB>
 * @author  jealone <https://github.com/jealone>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
    require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use factory\Farm;
use factory\Zoo;
use factory\SampleFactory;
 
// 初始化一个工厂
$farm = new Farm();
 
// 生产一只鸡
$farm->produce('chicken');
// 生产一只猪
$farm->produce('pig');
 
// 初始化一个动物园工厂
$zoo = new Zoo();
$zoo->produce("chicken");
$zoo->produce("pig");
 
// 工厂方法模式退化为简单工厂模式
SampleFactory::produce("chicken");
SampleFactory::produce("pig");
```

### 抽象工厂模式

```php
<?php
/**
 * 创建型模式
 *
 * php抽象工厂模式
 *
 * 说说我理解的工厂模式和抽象工厂模式的区别：
 * 工厂就是一个独立公司，负责生产对象；
 * 抽象工厂就是集团，负责生产子公司（工厂）；
 
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
    require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use factoryAbstract\AnimalFactory;
use factoryAbstract\PlantFactory;
 
// 初始化一个动物生产线, 包含了一族产品
$animal = new AnimalFactory();
 
// 初始化一个植物生产线, 包含了一族产品
$plant = new PlantFactory();
 
// 模拟调用， 抽象工厂模式核心是面向接口编程
function call(factoryAbstract\Factory $factory) {
    $earn = function(factoryAbstract\Income $income) {
        $income->money();
    };
    $earn($factory->createFarm());
    $earn($factory->createZoo());
}
 
call($animal);
call($plant);
```

### 原型模式

```php
<?php
/**
 * 创建型模式
 *
 * php原型模式
 * 用于创建对象成本过高时
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use prototype\Prototype;
 
// 创建一个原型对象
$prototype = new Prototype();
 
// 获取一个原型的clone
$prototypeCloneOne = $prototype->getPrototype();
$prototypeCloneOne->_name = 'one';
$prototypeCloneOne->getName();
 
// 获取一个原型的clone
$prototypeCloneTwo = $prototype->getPrototype();
$prototypeCloneTwo->_name = 'two';
$prototypeCloneTwo->getName();
 
// 再次获取$prototypeCloneOne的名称
$prototypeCloneOne->getName();
```

### 建造者模式

```php
<?php
/**
 * 创建型模式
 *
 * php建造者模式
 * 简单对象构建复杂对象
 * 基本组件不变，但是组件之间的组合方式善变
 *
 * 下面我们来构建手机和mp3
 *
 * // 手机简单由以下构成
 * 手机 => 名称，硬件， 软件
 * // 硬件又由以下硬件构成
 * 硬件 => 屏幕，cpu, 内存， 储存， 摄像头
 * // 软件又由以下构成
 * 软件 => android, ubuntu
 *
 * * // mp3简单由以下构成
 * 手机 => 名称，硬件， 软件
 * // 硬件又由以下硬件构成
 * 硬件 => cpu, 内存， 储存
 * // 软件又由以下构成
 * 软件 => mp3 os
 * 
 * builder 导演类
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use builder\ProductBuilder;
 
$builder = new ProductBuilder();
 
// 生产一款mp3
$builder->getMp3([
  'name' => '某族MP3',
  'hardware' => [
    'cpu'     => 1,
    'ram'     => 1,
    'storage' => 128,
  ],
  'software' => ['os' => 'mp3 os']
]);
 
echo "\n";
echo "----------------\n";
echo "\n";
 
// 生产一款手机
$builder->getPhone([
  'name' => '某米8s',
  'hardware' => [
    'screen'  => '5.8',
    'camera'  => '2600w',
    'cpu'     => 4,
    'ram'     => 8,
    'storage' => 128,
  ],
  'software' => ['os' => 'android 6.0']
]);
```

## 结构型模式实例

### 桥接模式

```php
<?php
/**
 * 结构型模式
 *
 * php桥接模式
 * 基础的结构型设计模式：将抽象和实现解耦,对抽象的实现是实体行为对接口的实现
 * 例如：人 => 抽象为属性：性别 动作：吃 => 人吃的动作抽象为interface => 实现不同的吃法
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use bridge\PersonMale;
use bridge\EatByChopsticks;
use bridge\EatByFork;
 
try {
  // 初始化一个用筷子吃饭的男人的实例
  $male = new PersonMale('male', new EatByChopsticks());
  // 吃饭
  $male->eat('大盘鸡');
 
} catch (\Exception $e) {
  echo $e->getMessage();
}
```

### 享元模式

```php
<?php
/**
 * 结构型模式
 *
 * php享元（轻量级）模式
 * 就是缓存了创建型模式创建的对象，不知道为什么会归在结构型模式中，个人觉得创建型模式更合适，哈哈～
 * 其次，享元强调的缓存对象，外观模式强调的对外保持简单易用，是不是就大体构成了目前牛逼哄哄且满大
 * 的街【依赖注入容器】
 *
 * 下面我们借助最简单的’工厂模式‘来实现享元模式，就是给工厂加了个缓存池
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use flyweight\Farm;
 
// 初始化一个工厂
$farm = new Farm();
 
// 成产一只鸡
$farm->produce('chicken')->getType();
// 再生产一只鸡
$farm->produce('chicken')->getType();
```

### 外观模式

```php
<?php
/**
 * 结构型模式
 *
 * php外观模式
 * 把系统中类的调用委托给一个单独的类，对外隐藏了内部的复杂性，很有依赖注入容器的感觉哦
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use facade\AnimalMaker;
 
// 初始化外观类
$animalMaker = new AnimalMaker();
 
// 生产一只猪
$animalMaker->producePig();
 
// 生产一只鸡
$animalMaker->produceChicken();
```

### 适配器模式

```php
<?php
/**
 * 结构型模式
 *
 * php适配器模式
 * 把实现了不同接口的对象通过适配器的方式组合起来放在一个新的环境
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use adapter\AudioPlayer;
 
try {
  //生产一台设备
  $mp4 = new AudioPlayer();
  // 播放一个mp3
  $mp4->play('忍者', 'mp3');
  // 播放一个wma
  $mp4->play('彩虹', 'wma');
  // 播放一个mp4
  $mp4->play('龙卷风mv', 'mp4');
} catch (\Exception $e) {
  echo $e->getMessage();
}
```

### 装饰器模式

```php
<?php
/**
 * 结构型模式
 *
 * php装饰器模式
 * 对现有的对象增加功能
 * 和适配器的区别：适配器是连接两个接口，装饰器是对现有的对象包装
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use decorator\DecoratorBrand;
use decorator\ShoesSport;
use decorator\ShoesSkateboard;
 
try {
  echo "未加装饰器之前：\n";
  // 生产运动鞋
  $shoesSport = new ShoesSport();
  $shoesSport->product();
 
  echo "\n--------------------\n";
  //-----------------------------------
 
  echo "加贴标装饰器：\n";
  // 初始化一个贴商标适配器
  $DecoratorBrand = new DecoratorBrand(new ShoesSport());
  $DecoratorBrand->_brand = 'nike';
  // 生产nike牌运动鞋
  $DecoratorBrand->product();
} catch (\Exception $e) {
  echo $e->getMessage();
}
```

### 组合模式

```php
<?php
/**
 * 结构型模式
 *
 * php组合（部分整体）模式
 * 定义：将对象以树形结构组织起来，以达成“部分－整体”的层次结构，使得客户端对单个对象和组合对象的使用具有一致性
 * 我的理解：把对象构建成树形结构
 *
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test 实现一个文件夹*************************************/
 
use composite\Folder;
use composite\File;
 
try {
  // 构建一个根目录
  $root = new Folder('根目录');
 
  // 根目录下添加一个test.php的文件和usr,mnt的文件夹
  $testFile = new File('test.php');
  $usr = new Folder('usr');
  $mnt = new Folder('mnt');
  $root->add($testFile);
  $root->add($usr);
  $root->add($mnt);
  $usr->add($testFile);// usr目录下加一个test.php的文件
 
  // 打印根目录文件夹节点
  $root->printComposite();
 
} catch (\Exception $e) {
  echo $e->getMessage();
}
```

### 代理模式

```php
<?php
/**
 * 结构型模式
 *
 * php代理器模式
 * 对对象加以【控制】
 * 和适配器的区别：适配器是连接两个接口（【改变】了接口）
 * 和装饰器的区别：装饰器是对现有的对象包装（【功能扩展】）
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use proxy\Proxy;
use proxy\ShoesSport;
 
try {
  echo "未加代理之前：\n";
  // 生产运动鞋
  $shoesSport = new ShoesSport();
  $shoesSport->product();
 
  echo "\n--------------------\n";
  //-----------------------------------
 
  echo "加代理：\n";
  // 把运动鞋产品线外包给代工厂
  $proxy = new Proxy('sport');
  // 代工厂生产运动鞋
  $proxy->product();
} catch (\Exception $e) {
  echo $e->getMessage();
}
```

### 过滤器模式

```php
<?php
/**
 * 结构型模式
 *
 * php过滤器模式
 * 使用不同的标准来过滤一组对象，说实话没明白该模式的意义，忘你留言补充讲解
 *
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use filter\SportsPerson;
use filter\FilterSportType;
use filter\FilterGender;
 
try {
  // 定义一组运动员
  $persons = [];
  $persons[] = new SportsPerson('male', 'basketball');
  $persons[] = new SportsPerson('female', 'basketball');
  $persons[] = new SportsPerson('male', 'football');
  $persons[] = new SportsPerson('female', 'football');
  $persons[] = new SportsPerson('male', 'swim');
  $persons[] = new SportsPerson('female', 'swim');
 
  // 按过滤男性
  $filterGender = new FilterGender('male');
  var_dump($filterGender->filter($persons));
  // 过滤运动项目篮球
  $filterSportType = new FilterSportType('basketball');
  var_dump($filterSportType->filter($persons));
 
} catch (\Exception $e) {
  echo $e->getMessage();
}
```

## 行为型模式实例

### 模板模式

```php
<?php
/**
 * 行为型模式
 *
 * php模板模式
 * 理解：典型的控制反转，子类复写算法，但是最终的调用都是抽象类中定义的方式，也就是说抽象类中
 * 定义了算法的执行顺序
 * 使用场景：例如短信系统，选择不同的短信商，但是发送短信的动作都是一样的,未来要增加不同的厂商
 * 只需添加子类即可
 *
 * 下面实现一个短信发送系统
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use template\SmsCompanyOne;
use template\SmsCompanyTwo;
 
try {
  // 用厂商one发短信
  $one = new SmsCompanyOne([
    'appkey' => 'akjlooolllnn',
  ]);
  $one->send('13666666666');
 
  // 用厂商two发短息
  $one = new SmsCompanyTwo([
    'pwd' => 'adadeooonn',
  ]);
  $one->send('13666666666');
 
} catch (\Exception $e) {
  echo 'error:' . $e->getMessage();
}
```

### 策略模式

```php
<?php
/**
 * 行为型模式
 *
 * php策略模式
 * 策略依照使用而定
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use strategy\Substance;
use strategy\StrategyExampleOne;
use strategy\StrategyExampleTwo;
 
// 使用策略1
$substanceOne = new Substance(new StrategyExampleOne);
$substanceOne->someOperation();
 
// 使用策略2
$substanceTwo = new Substance(new StrategyExampleTwo);
$substanceTwo->someOperation();
```

### 状态模式

```php
<?php
/**
 * 行为型模式
 *
 * php状态模式
 * 理解：行为随着状态变化
 * 区别：
 * - 策略的改变由client完成，client持有context的引用；而状态的改变是由context或状态自己,
 * 就是自身持有context
 * - 简单说就是策略是client持有context，而状态是本身持有context
 * 使用场景：大量和对象状态相关的条件语句
 *
 * 下面我们来实现一个农民四季种菜
 * 春季：玉米
 * 夏季：黄瓜
 * 秋季：白菜
 * 冬季：菠菜
 *
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use state\Farmer;
 
try {
  // 初始化一个农民
  $farmer = new Farmer();
 
  // 春季
  $farmer->grow();
  $farmer->harvest();
  // 夏季
  $farmer->grow();
  $farmer->harvest();
  // 秋季
  $farmer->grow();
  $farmer->harvest();
  // 冬季
  $farmer->grow();
  $farmer->harvest();
 
} catch (\Exception $e) {
  echo 'error:' . $e->getMessage();
}
```

### 观察者模式

```php
<?php
/**
 * 行为型模式
 *
 * php观察者模式
 * 观察者观察被观察者，被观察者通知观察者
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use observer\Observable;
use observer\ObserverExampleOne;
use observer\ObserverExampleTwo;
 
// 注册一个被观察者对象
$observable = new Observable();
// 注册观察者们
$observerExampleOne = new ObserverExampleOne();
$observerExampleTwo = new ObserverExampleTwo();
 
// 附加观察者
$observable->attach($observerExampleOne);
$observable->attach($observerExampleTwo);
 
// 被观察者通知观察者们
$observable->notify();
```

### 责任链模式

```php
<?php
/**
 * 行为型模式
 *
 * php责任链模式
 * 理解：把一个对象传递到一个对象链上，直到有对象处理这个对象
 * 可以干什么：我们可以做一个filter,或者gateway
 *
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use chainOfResponsibility\HandlerAccessToken;
use chainOfResponsibility\HandlerFrequent;
use chainOfResponsibility\HandlerArguments;
use chainOfResponsibility\HandlerSign;
use chainOfResponsibility\HandlerAuthority;
use chainOfResponsibility\Request;
 
try {
  // 下面我们用责任链模式实现一个api-gateway即接口网关
 
  // 初始化一个请求对象
  $request            =  new Request();
  // 设置一个请求身份id
  $request->requestId = uniqid();
 
  // 初始化一个：令牌校验的handler
  $handlerAccessToken =  new HandlerAccessToken();
  // 初始化一个：访问频次校验的handler
  $handlerFrequent    =  new HandlerFrequent();
  // 初始化一个：必传参数校验的handler
  $handlerArguments   =  new HandlerArguments();
  // 初始化一个：签名校验的handler
  $handlerSign        =  new HandlerSign();
  // 初始化一个：访问权限校验的handler
  $handlerAuthority   =  new HandlerAuthority();
 
  // 构成对象链
  $handlerAccessToken->setNext($handlerFrequent)
                     ->setNext($handlerArguments)
                     ->setNext($handlerSign)
                     ->setNext($handlerAuthority);
  // 启动网关
  $handlerAccessToken->start($request);
 
} catch (\Exception $e) {
  echo $e->getMessage();
}
```

### 访问者模式

```php
<?php
/**
 * 行为型模式
 *
 * php访问者模式
 *
 * 说说我对的策略模式和访问者模式的区分：
 * 乍一看，其实两者都挺像的，都是实体类依赖了外部实体的算法，但是：
 * 对于策略模式：首先你是有一堆算法，然后在不同的逻辑中去使用；
 * 对于访问者模式：实体的【结构是稳定的】，但是结构中元素的算法却是多变的，比如就像人吃饭这个动作
 * 是稳定不变的，但是具体吃的行为却又是多变的；
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use visitor\Person;
use visitor\VisitorAsia;
use visitor\VisitorAmerica;
 
// 生产一个人的实例
$person = new Person();
 
// 来到了亚洲
$person->eat(new VisitorAsia());
 
// 来到了美洲
$person->eat(new VisitorAmerica());
```

### 解释器模式

```php
<?php
/**
 * 行为型模式
 *
 * php解析器模式
 * 理解：就是一个上下文的连接器
 * 使用场景：构建一个编译器，SQL解析器
 * 下面我们来实现一个简单增删改查的sql解析器
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use interpreter\SqlInterpreter;
 
try {
  //增加数据
  SqlInterpreter::db('user')->insert([
    'nickname' => 'tigerb',
    'mobile'   => '1366666666',
    'password' => '123456'
  ]);
  //删除数据
  SqlInterpreter::db('user')->delete([
    'nickname' => 'tigerb',
    'mobile'   => '1366666666',
  ]);
  //修改数据
  SqlInterpreter::db('member')->update([
    'id'       => '1',
    'nickname' => 'tigerbcode'
  ]);
  //查询数据
  SqlInterpreter::db('member')->find([
    'mobile'   => '1366666666',
  ]);
} catch (\Exception $e) {
  echo 'error:' . $e->getMessage();
}
```

### 备忘录模式

```php
<?php
/**
 * 行为型模式
 *
 * php备忘录模式
 * 理解：就是外部存储对象的状态，以提供后退/恢复/复原
 * 使用场景：编辑器后退操作/数据库事物/存档
 *
 * 下面我们来实现编辑器的undo(撤销)/redo（重置）功能
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use memento\Editor;
 
try {
  // 初始化一个编辑器并新建一个空文件
  $editor = new Editor('');
 
  // 写入一段文本
  $editor->write('hello php !');
  // 保存
  $editor->save();
  // 修改刚才的文本
  $editor->write(' no code no life !');
  // 撤销
  $editor->undo();
  $editor->read();
  // 再次修改并保存文本
  $editor->write(' life is a struggle !');
  $editor->save();
  // 重置
  $editor->redo();
  $editor->read();
 
} catch (\Exception $e) {
  echo 'error:' . $e->getMessage();
}
```

### 命令模式

```php
<?php
/**
 * 行为型模式
 *
 * php命令模式
 * 命令模式:就是在依赖的类中间加一个命令类，本来可以直接调用的类方法现在通过命令来调用，已达到
 * 解耦的的目的，其次可以实现undo，redo等操作，因为你知道调了哪些命令
 *
 * 下面我们来用命令模式实现一个记事本，涉及的命令：
 * - 新建
 * - 写入
 * - 保存
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use command\Text;
use command\OrderCreate;
use command\OrderWrite;
use command\OrderSave;
use command\Console;
 
try {
  // 创建一个记事本实例
  $text   = new Text();
 
  // 创建命令
  $create = new OrderCreate($text, [
    'filename' => 'test.txt'
  ]);
  // 写入命令
  $write  = new OrderWrite($text, [
    'filename' => 'test.txt',
    'content'  => 'life is a struggle'
  ]);
  // 保存命令
  $save   = new OrderSave($text, [
    'filename' => 'text.txt'
  ]);
 
  // 创建一个控制台
  $console = new Console();
  // 添加命令
  $console->add($create);
  $console->add($write);
  $console->add($save);
  // 运行命令
  $console->run();
 
} catch (\Exception $e) {
  echo $e->getMessage();
}
```

### 迭代器模式

```php
<?php
/**
 * 行为型模式
 *
 * php迭代器模式
 * 理解：遍历对象内部的属性，无需对外暴露内部的构成
 * 下面我们来实现一个迭代器访问学校所有的老师
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use iterator\SchoolExperimental;
 
try {
  // 初始化一个实验小学
  $experimental = new SchoolExperimental();
  // 添加老师
  $experimental->addTeacher('Griffin');
  $experimental->addTeacher('Curry');
  $experimental->addTeacher('Mc');
  $experimental->addTeacher('Kobe');
  $experimental->addTeacher('Rose');
  $experimental->addTeacher('Kd');
  // 获取教师迭代器
  $iterator = $experimental->getIterator();
  // 打印所有老师
  do {
    $iterator->current();
  } while ($iterator->hasNext());
 
} catch (\Exception $e) {
  echo 'error:' . $e->getMessage();
}
```

### 中介者器模式

```php
<?php
/**
 * 行为型模式
 *
 * php中介者模式
 * 理解：就是不同的对象之间通信，互相之间不直接调用，而是通过一个中间对象（中介者）
 * 使用场景：对象之间大量的互相依赖
 * 下面实现一个房屋中介
 *
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use mediator\Tenant;
use mediator\Landlord;
use mediator\HouseMediator;
 
try {
  // 初始化一个租客
  $tenant = new Tenant('小明');
 
  // 小明直接找小梅租房
  $landlord = new Landlord('小梅');
  echo $landlord->doSomthing($tenant);
 
  // 小明通过房屋中介租房
  // 初始化一个房屋中介
  $mediator = new HouseMediator();
  // 租房
  $mediator->rentHouse($tenant);
 
} catch (\Exception $e) {
  echo 'error:' . $e->getMessage();
}
```

### 空对象模式

```php
<?php
/**
 * 行为型模式
 *
 * php空对象模式
 * 理解：当程序运行过程中出现操作空对象时，程序依然能够通过操作提供的空对象继续执行
 * 使用场景：谨慎使用吧
 *
 * 下面实现老师课堂叫学生回答问题
 *
 *
 * @author  TIGERB <https://github.com/TIGERB>
 * @example 运行 php test.php
 */
 
 
// 注册自加载
spl_autoload_register('autoload');
 
function autoload($class)
{
  require dirname($_SERVER['SCRIPT_FILENAME']) . '//..//' . str_replace('\\', '/', $class) . '.php';
}
 
/************************************* test *************************************/
 
use nullObject\Teacher;
use nullObject\Student;
 
try {
  //创建一个老师：路飞
  $teacher = new Teacher('路飞');
 
  // 创建学生
  $mc      = new Student('麦迪');
  $kobe    = new Student('科比');
  $paul    = new Student('保罗');
 
  // 老师提问
  $teacher->doSomthing($mc);
  $teacher->doSomthing($kobe);
  $teacher->doSomthing($paul);
  $teacher->doSomthing('小李');// 提问了一个班级里不存在人名
 
 
} catch (\Exception $e) {
  echo 'error:' . $e->getMessage();
}
```
