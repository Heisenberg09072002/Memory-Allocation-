# Memory-Allocation-
Memory Allocation Simulator
NEED 

Memory allocation is primarily a hardware operation but it is managed by operating 
system. People knows and learn how the memory allocation for the processes work 
but they cant understand at the hardware level. That’s why this simulator is needed 
to understand how the memory allocation work at the hardware level. When the 
people will operate the simulator and they themselves will see how the memory 
allocation happens than they can understand in a better way.

OBJECTIVE AND SCOPE

To make a c based project to show the how memory is allocated to various 
processes. The project will run on linux based operating system. The interface will 
take input from the user about what is the size of the memory and which efficient 
algorithm to choose while allocating the memory, i.e. first fit, best fit, worst fit. We 
can add as many processes as we want in the program and can remove a process 
whenever we want. We can also reset the whole system to remove all processes at 
once and bring the system to its default value. This will give flexibility to the project 
and improve the user experience. The project can work on low end operating system 
also. It will be a simple project and will have a scope of adding a gui experience 
better and much efficient. Our project will be a basic project which will have a 
scope of adding good animations and will be more interesting and interactive for the 
user. In ths project we can add the scheduling of the processes in future also which 
will also show the simulation of the process scheduling.

ALGORITHMS

1. Best Fit 
This method keeps the free/busy list in order by size – smallest to largest. In this 
method, the operating system first searches the whole of the memory according to 
the size of the given job and allocates it to the closest-fitting free partition in the 
memory, making it able to use memory efficiently. Here the jobs are in the order 
from smallest job to largest job.

Advantages : Memory Efficient. The operating system allocates the job minimum possible space in the memory, making memory management very efficient. To save memory from getting wasted, it is the best method.

Disadvantages : It is a Slow Process. Checking the whole memory for each job makes the working of the operating system very slow. It takes a lot of time to complete the work.

2. First fit 
This method keeps the free/busy list of jobs organized by memory location, lowordered to high-ordered memory. In this method, first job claims the first available 
memory with space more than or equal to it’s size. The operating system doesn’t 
search for appropriate partition but just allocate the job to the nearest memory 
partition available with sufficient size. 

Advantages : It is fast in processing. As the processor allocates the nearest available memory partition to the job, it is very fast in execution.

Disadvantages : It wastes a lot of memory. The processor ignores if the size of partition allocated to the job is very large as compared to the size of job or not. It just allocates the memory. As a result, a lot of memory is wasted and many jobs may not get space in the memory, and would have to wait for another job to complete.

3. Worst Fit 
Worst Fit allocates a process to the partition which is largest sufficient among the 
freely available partitions available in the main memory. If a large process comes at 
a later stage, then memory will not have space to accommodate it. 
We will be seeing and adding some templates for gui. We will also be using the help 
of syntaxes and internet resource for the gui part.

Advantages : Since this process chooses the largest hole/partition, therefore there will be large internal fragmentation. Now, this internal fragmentation will be quite big so that other small processes can also be placed in that leftover partition.

Disadvantages : It is a slow process because it traverses all the partitions in the memory and then selects the largest partition among all the partitions, which is a time-consuming process.

TECHNOLOGIES USED 

Languages : C/C++ 
Operating System : Windows, Linux, Ubuntu, 
Softwares : VS Code, Code Blocks, Oracle Virtual Box 
Internet resources for basic GUI
