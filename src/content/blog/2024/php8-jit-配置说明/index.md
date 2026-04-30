---
categories:
- PHP
category: PHP
draft: false
published: 2024-01-09 12:44:11
slug: php8-jit-配置说明
tags:
- PHP
- jit
- opcache
- opcode
title: PHP8 JIT 配置说明
updated: 2024-01-09 12:45:30
---

注意点:

* Opcache会做opcode层面的优化，比如图中的俩条opcode合并为一条
* PHP8的JIT目前是在Opcache之中提供的
* JIT在Opcache优化之后的基础上，结合Runtime的信息再次优化，直接生成机器码
* JIT不是原来Opcache优化的替代，是增强
* 目前PHP8只支持x86架构的CPU

JIT共用了很多原来Opcache做优化的基础数据结构，比如data flow graph, call graph, SSA.

**配置php.ini**

参考文档：

<https://www.php.net/manual/zh/opcache.configuration.php>

下载安装好以后，除掉原有的opcache配置以外，对于JIT我们需要添加如下配置到php.ini：

```
opcache.jit=1205
opcache.jit_buffer_size=128M
```

opcache.jit这个配置看起来稍微有点复杂，我来解释下, 这个配置由4个独立的数字组成，从左到右分别是:

1. 是否在生成机器码点时候使用AVX指令, 需要CPU支持: 
   * 0: 不使用 1: 使用
2. 寄存器分配策略： 
   * 0: 不使用寄存器分配 1: 局部(block)域分配 2: 全局(function)域分配
3. JIT触发策略: 0: PHP脚本载入的时候就JIT 
   * 1: 当函数第一次被执行时JIT
   * 2: 在一次运行后，JIT调用次数最多的百分之(opcache.prof\_threshold \* 100)的函数
   * 3: 当函数/方法执行超过N(N和opcache.jit\_hot\_func相关)次以后JIT
   * 4: 当函数方法的注释中含有@jit的时候对它进行JIT
   * 5: 当一个Trace执行超过N次（和opcache.jit\_hot\_loop, jit\_hot\_return等有关)以后JIT
4. JIT优化策略，数值越大优化力度越大: 
   * 0: 不JIT
   * 1: 做opline之间的跳转部分的JIT
   * 2: 内敛opcode handler调用
   * 3: 基于类型推断做函数级别的JIT
   * 4: 基于类型推断，过程调用图做函数级别JIT
   * 5: 基于类型推断，过程调用图做脚本级别的JIT

基于此，我们可以大概得到如下几个结论：

* 尽量使用12x5型的配置，此时应该是效果最优的
* 对于x， 如果是脚本级别的，推荐使用0， 如果是Web服务型的，可以根据测试结果选择3或5
* @jit的形式，在有了attributes以后，可能变为<<jit>>

现在，我们来测试下启用和不启用JIT的时候，Zend/bench.php的差异。

Zend/bench.php：<https://github.com/php/php-src/blob/master/Zend/bench.php>

```
<?php
if (function_exists("date_default_timezone_set")) {
    date_default_timezone_set("UTC");
}

function simple() {
  $a = 0;
  for ($i = 0; $i < 1000000; $i++)
    $a++;

  $thisisanotherlongname = 0;
  for ($thisisalongname = 0; $thisisalongname < 1000000; $thisisalongname++)
    $thisisanotherlongname++;
}

/****/

function simplecall() {
  for ($i = 0; $i < 1000000; $i++)
    strlen("hallo");
}

/****/

function hallo($a) {
}

function simpleucall() {
  for ($i = 0; $i < 1000000; $i++)
    hallo("hallo");
}

/****/

function simpleudcall() {
  for ($i = 0; $i < 1000000; $i++)
    hallo2("hallo");
}

function hallo2($a) {
}

/****/

function mandel() {
  $w1=50;
  $h1=150;
  $recen=-.45;
  $imcen=0.0;
  $r=0.7;
  $s=0;  $rec=0;  $imc=0;  $re=0;  $im=0;  $re2=0;  $im2=0;
  $x=0;  $y=0;  $w2=0;  $h2=0;  $color=0;
  $s=2*$r/$w1;
  $w2=40;
  $h2=12;
  for ($y=0 ; $y<=$w1; $y=$y+1) {
    $imc=$s*($y-$h2)+$imcen;
    for ($x=0 ; $x<=$h1; $x=$x+1) {
      $rec=$s*($x-$w2)+$recen;
      $re=$rec;
      $im=$imc;
      $color=1000;
      $re2=$re*$re;
      $im2=$im*$im;
      while( ((($re2+$im2)<1000000) && $color>0)) {
        $im=$re*$im*2+$imc;
        $re=$re2-$im2+$rec;
        $re2=$re*$re;
        $im2=$im*$im;
        $color=$color-1;
      }
      if ( $color==0 ) {
        print "_";
      } else {
        print "#";
      }
    }
    print "<br>";
    flush();
  }
}

/****/

function mandel2() {
  $b = " .:,;!/>)|&IH%*#";
  //float r, i, z, Z, t, c, C;
  for ($y=30; printf("\n"), $C = $y*0.1 - 1.5, $y--;){
    for ($x=0; $c = $x*0.04 - 2, $z=0, $Z=0, $x++ < 75;){
      for ($r=$c, $i=$C, $k=0; $t = $z*$z - $Z*$Z + $r, $Z = 2*$z*$Z + $i, $z=$t, $k<5000; $k++)
        if ($z*$z + $Z*$Z > 500000) break;
      echo $b[$k%16];
    }
  }
}

/****/

function Ack($m, $n){
  if($m == 0) return $n+1;
  if($n == 0) return Ack($m-1, 1);
  return Ack($m - 1, Ack($m, ($n - 1)));
}

function ackermann($n) {
  $r = Ack(3,$n);
  print "Ack(3,$n): $r\n";
}

/****/

function ary($n) {
  for ($i=0; $i<$n; $i++) {
    $X[$i] = $i;
  }
  for ($i=$n-1; $i>=0; $i--) {
    $Y[$i] = $X[$i];
  }
  $last = $n-1;
  print "$Y[$last]\n";
}

/****/

function ary2($n) {
  for ($i=0; $i<$n;) {
    $X[$i] = $i; ++$i;
    $X[$i] = $i; ++$i;
    $X[$i] = $i; ++$i;
    $X[$i] = $i; ++$i;
    $X[$i] = $i; ++$i;

    $X[$i] = $i; ++$i;
    $X[$i] = $i; ++$i;
    $X[$i] = $i; ++$i;
    $X[$i] = $i; ++$i;
    $X[$i] = $i; ++$i;
  }
  for ($i=$n-1; $i>=0;) {
    $Y[$i] = $X[$i]; --$i;
    $Y[$i] = $X[$i]; --$i;
    $Y[$i] = $X[$i]; --$i;
    $Y[$i] = $X[$i]; --$i;
    $Y[$i] = $X[$i]; --$i;

    $Y[$i] = $X[$i]; --$i;
    $Y[$i] = $X[$i]; --$i;
    $Y[$i] = $X[$i]; --$i;
    $Y[$i] = $X[$i]; --$i;
    $Y[$i] = $X[$i]; --$i;
  }
  $last = $n-1;
  print "$Y[$last]\n";
}

/****/

function ary3($n) {
  for ($i=0; $i<$n; $i++) {
    $X[$i] = $i + 1;
    $Y[$i] = 0;
  }
  for ($k=0; $k<1000; $k++) {
    for ($i=$n-1; $i>=0; $i--) {
      $Y[$i] += $X[$i];
    }
  }
  $last = $n-1;
  print "$Y[0] $Y[$last]\n";
}

/****/

function fibo_r($n){
    return(($n < 2) ? 1 : fibo_r($n - 2) + fibo_r($n - 1));
}

function fibo($n) {
  $r = fibo_r($n);
  print "$r\n";
}

/****/

function hash1($n) {
  for ($i = 1; $i <= $n; $i++) {
    $X[dechex($i)] = $i;
  }
  $c = 0;
  for ($i = $n; $i > 0; $i--) {
    if ($X[dechex($i)]) { $c++; }
  }
  print "$c\n";
}

/****/

function hash2($n) {
  for ($i = 0; $i < $n; $i++) {
    $hash1["foo_$i"] = $i;
    $hash2["foo_$i"] = 0;
  }
  for ($i = $n; $i > 0; $i--) {
    foreach($hash1 as $key => $value) $hash2[$key] += $value;
  }
  $first = "foo_0";
  $last  = "foo_".($n-1);
  print "$hash1[$first] $hash1[$last] $hash2[$first] $hash2[$last]\n";
}

/****/

function gen_random ($n) {
    global $LAST;
    return( ($n * ($LAST = ($LAST * IA + IC) % IM)) / IM );
}

function heapsort_r($n, &$ra) {
    $l = ($n >> 1) + 1;
    $ir = $n;

    while (1) {
    if ($l > 1) {
        $rra = $ra[--$l];
    } else {
        $rra = $ra[$ir];
        $ra[$ir] = $ra[1];
        if (--$ir == 1) {
        $ra[1] = $rra;
        return;
        }
    }
    $i = $l;
    $j = $l << 1;
    while ($j <= $ir) {
        if (($j < $ir) && ($ra[$j] < $ra[$j+1])) {
        $j++;
        }
        if ($rra < $ra[$j]) {
        $ra[$i] = $ra[$j];
        $j += ($i = $j);
        } else {
        $j = $ir + 1;
        }
    }
    $ra[$i] = $rra;
    }
}

function heapsort($N) {
  global $LAST;

  define("IM", 139968);
  define("IA", 3877);
  define("IC", 29573);

  $LAST = 42;
  for ($i=1; $i<=$N; $i++) {
    $ary[$i] = gen_random(1);
  }
  heapsort_r($N, $ary);
  printf("%.10f\n", $ary[$N]);
}

/****/

function mkmatrix ($rows, $cols) {
    $count = 1;
    $mx = array();
    for ($i=0; $i<$rows; $i++) {
    for ($j=0; $j<$cols; $j++) {
        $mx[$i][$j] = $count++;
    }
    }
    return($mx);
}

function mmult ($rows, $cols, $m1, $m2) {
    $m3 = array();
    for ($i=0; $i<$rows; $i++) {
    for ($j=0; $j<$cols; $j++) {
        $x = 0;
        for ($k=0; $k<$cols; $k++) {
        $x += $m1[$i][$k] * $m2[$k][$j];
        }
        $m3[$i][$j] = $x;
    }
    }
    return($m3);
}

function matrix($n) {
  $SIZE = 30;
  $m1 = mkmatrix($SIZE, $SIZE);
  $m2 = mkmatrix($SIZE, $SIZE);
  while ($n--) {
    $mm = mmult($SIZE, $SIZE, $m1, $m2);
  }
  print "{$mm[0][0]} {$mm[2][3]} {$mm[3][2]} {$mm[4][4]}\n";
}

/****/

function nestedloop($n) {
  $x = 0;
  for ($a=0; $a<$n; $a++)
    for ($b=0; $b<$n; $b++)
      for ($c=0; $c<$n; $c++)
        for ($d=0; $d<$n; $d++)
          for ($e=0; $e<$n; $e++)
            for ($f=0; $f<$n; $f++)
             $x++;
  print "$x\n";
}

/****/

function sieve($n) {
  $count = 0;
  while ($n-- > 0) {
    $count = 0;
    $flags = range (0,8192);
    for ($i=2; $i<8193; $i++) {
      if ($flags[$i] > 0) {
        for ($k=$i+$i; $k <= 8192; $k+=$i) {
          $flags[$k] = 0;
        }
        $count++;
      }
    }
  }
  print "Count: $count\n";
}

/****/

function strcat($n) {
  $str = "";
  while ($n-- > 0) {
    $str .= "hello\n";
  }
  $len = strlen($str);
  print "$len\n";
}

/*****/

function gethrtime()
{
  $hrtime = hrtime();
  return (($hrtime[0]*1000000000 + $hrtime[1]) / 1000000000);
}

function start_test()
{
    ob_start();
  return gethrtime();
}

function end_test($start, $name)
{
  global $total;
  $end = gethrtime();
  ob_end_clean();
  $total += $end-$start;
  $num = number_format($end-$start,3);
  $pad = str_repeat(" ", 24-strlen($name)-strlen($num));

  echo $name.$pad.$num."\n";
    ob_start();
  return gethrtime();
}

function total()
{
  global $total;
  $pad = str_repeat("-", 24);
  echo $pad."\n";
  $num = number_format($total,3);
  $pad = str_repeat(" ", 24-strlen("Total")-strlen($num));
  echo "Total".$pad.$num."\n";
}

$t0 = $t = start_test();
simple();
$t = end_test($t, "simple");
simplecall();
$t = end_test($t, "simplecall");
simpleucall();
$t = end_test($t, "simpleucall");
simpleudcall();
$t = end_test($t, "simpleudcall");
mandel();
$t = end_test($t, "mandel");
mandel2();
$t = end_test($t, "mandel2");
ackermann(7);
$t = end_test($t, "ackermann(7)");
ary(50000);
$t = end_test($t, "ary(50000)");
ary2(50000);
$t = end_test($t, "ary2(50000)");
ary3(2000);
$t = end_test($t, "ary3(2000)");
fibo(30);
$t = end_test($t, "fibo(30)");
hash1(50000);
$t = end_test($t, "hash1(50000)");
hash2(500);
$t = end_test($t, "hash2(500)");
heapsort(20000);
$t = end_test($t, "heapsort(20000)");
matrix(20);
$t = end_test($t, "matrix(20)");
nestedloop(12);
$t = end_test($t, "nestedloop(12)");
sieve(30);
$t = end_test($t, "sieve(30)");
strcat(200000);
$t = end_test($t, "strcat(200000)");
total();
?>
```

首先是不启用(php -d opcache.jit\_buffer\_size=0 Zend/bench.php):

```
simple 0.008

simplecall 0.004

simpleucall 0.004

simpleudcall 0.004

mandel 0.035

mandel2 0.055

ackermann(7) 0.020

ary(50000) 0.004

ary2(50000) 0.003

ary3(2000) 0.048

fibo(30) 0.084

hash1(50000) 0.013

hash2(500) 0.010

heapsort(20000) 0.027

matrix(20) 0.026

nestedloop(12) 0.023

sieve(30) 0.013

strcat(200000) 0.006

------------------------

Total 0.387
```

根据上面的介绍，我们选择opcache.jit=1205, 因为bench.php是脚本(php -d opcache.jit\_buffer\_size=64M -d opcache.jit=1205 Zend/bench.php)：

```
simple 0.002

simplecall 0.001

simpleucall 0.001

simpleudcall 0.001

mandel 0.010

mandel2 0.011

ackermann(7) 0.010

ary(50000) 0.003

ary2(50000) 0.002

ary3(2000) 0.018

fibo(30) 0.031

hash1(50000) 0.011

hash2(500) 0.008

heapsort(20000) 0.014

matrix(20) 0.015

nestedloop(12) 0.011

sieve(30) 0.005

strcat(200000) 0.004

------------------------

Total 0.157
```

可见，**对于Zend/bench.php, 相比不开启JIT，开启了以后，耗时降低将近60%，性能提升将近2倍**。