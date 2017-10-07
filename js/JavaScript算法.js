//希尔排序算法

function shellSort(arr)
{
	var i,j,m,increamet,d;//d表示当前的间隔
    increamet =parseInt(arr.length/3,10);//经验之谈，间隔是长度除以3
    for(m=increamet;m>=1;m--)//希尔排序间隔逐步减一
    {
    	d = m;//当前间隔
    	debugger;
    	for(i=d;i<arr.length;i++)
    	{
    		var temp = arr[i];//保存当前的arr[i]的值得大小
    		j = i-d;
    		if(temp<arr[j])
    		{
    			do{
    				arr[j+d]=arr[j];
    				j = j-d;//这里必须指定到前一个不然会产生死循环
    				if(j<0)
    				{
    					break;
    				}
    				
    			}while(j>0 && temp<arr[j])
    			arr[j+d] =temp;
    		}
    		else{
    			arr[j+d]=temp;
    		}
    		
    	}
    }
    return arr;
}


//插入排序
function  insertSort(arr)
{
	var i,j;
	for(i = 1;i<arr.length;i++)
	{
		var temp = arr[i];
		
		for(j = i-1;j>=0;j--)//找到插入的位置
		{
			if(temp>arr[j])
			{
				break;
			}
			else{
				arr[j+1] = arr[j];
			}
			
		}
		
		arr[j+1] = temp;
		
	}
	return arr;
}


//冒泡排序
function bubbleSort(arr)
{
	var i,j;
	for( i=0;i<arr.length-1;i++)
	{
		var isFinished = true;
		for(j=0;j<arr.length-i;j++)
		{
			if(arr[j]>arr[j+1])
			{
				var temp = arr[j];
				arr[j]   = arr[j+1];
				arr[j+1] = temp;
				isFinished = false;
			}
			
		}
		if(isFinished)
		{
			break;
		}
	}
}


//交换排序
function selectSort(arr){
	var i,j,k;
	for(i=0;i<arr.length-1;i++)
	{
		k = i;
		for(j=i;j<arr.length;j++)
		{
			if(arr[k]>arr[j])
			{
				k = j;
			}
		}
		if(k!==i)
		{
			var temp = arr[i];
			arr[i] = arr[k];
			arr[k] = temp;
		}
	}
	return arr;
}


//归并排序




