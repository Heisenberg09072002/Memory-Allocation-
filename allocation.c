#include <stdio.h>

void implimentBestFit(int blockSize[], int blocks, int processSize[], int processes)
{
    int allocation[processes];
   
    for(int i = 0; i < processes; i++){
        allocation[i] = -1;
    }
   
    for (int i=0; i<processes; i++)
    {
        int indexPlaced = -1;
        for (int j=0; j<blocks; j++)
        {
            if (blockSize[j] >= processSize[i])
                if (indexPlaced == -1)
                    indexPlaced = j;
                   
                else if (blockSize[j] < blockSize[indexPlaced])
                    indexPlaced = j;
            }
        }
      
        if (indexPlaced != -1)
        {
            allocation[i] = indexPlaced;

            blockSize[indexPlaced] -= processSize[i];
        }
    }
 
    printf("\nProcess No.\tProcess Size\tBlock no.\n");
    for (int i = 0; i < processes; i++)
    {
        printf("%d \t\t\t %d \t\t\t", i+1, processSize[i]);
        if (allocation[i] != -1)
            printf("%d\n",allocation[i] + 1);
        else
            printf("Not Allocated\n");
    }
}

void implimentFirstFit(int blockSize[], int blocks, int processSize[], int processes)
{
    int allocate[processes];
   
    for(int i = 0; i < processes; i++)
    {
allocate[i] = -1;
    }

   
    for (int i = 0; i < processes; i++)
    {
        for (int j = 0; j < blocks; j++) {
            if (blockSize[j] >= processSize[i])
            {
                allocate[i] = j;
 
                blockSize[j] -= processSize[i];
 
                break;
            }
        }
    }
    printf("\nProcess No.\tProcess Size\tBlock no.\n");
    for (int i = 0; i < processes; i++)
    {
        printf("%d \t\t\t %d \t\t\t", i+1, processSize[i]);
        if (allocate[i] != -1)
            printf("%d\n",allocate[i] + 1);
        else
            printf("Not Allocated\n");
    }
}

void implimentWorstFit(int blockSize[], int blocks, int processSize[], int processes)
{ 
    int allocation[processes]; 
   
    for(int i = 0; i < processes; i++){
        allocation[i] = -1;
    } 
   
    for (int i=0; i<processes; i++)
    { 
        int indexPlaced = -1;
        for (int j=0; j<blocks; j++)
        {
            if (blockSize[j] >= processSize[i])
            { 
                if (indexPlaced == -1)
                    indexPlaced = j; 
                else if (blockSize[indexPlaced] < blockSize[j])
                    indexPlaced = j;
            }
        }
 
       
        if (indexPlaced != -1)
        { 
            allocation[i] = indexPlaced; 
           
            blockSize[indexPlaced] -= processSize[i];
        }
    } 
    printf("\nProcess No.\tProcess Size\tBlock no.\n");
    for (int i = 0; i < processes; i++)
    {
        printf("%d \t\t\t %d \t\t\t", i+1, processSize[i]);
        if (allocation[i] != -1)
            printf("%d\n",allocation[i] + 1);
        else
            printf("Not Allocated\n");
    }
}

int main()
{
    int blocks,blockSize[900],processSize[900],processes,n=0;
    printf("Enter the number of blocks \n");
    scanf("%d",&blocks);
    for(int i=0;i<blocks;i++)
    {
        scanf("%d",&blockSize[i]); 
    }
    printf("Enter the number of processes \n");
    scanf("%d",&processes);
    for(int i=0;i<processes;i++)
    {
        scanf("%d",&processSize[i]); 
    }
    printf("Enter the type of memory allocation required \n");
    printf("1.Best Fit \n");
    printf("2.First Fit \n");
    printf("3.Worst Fit \n");
    scanf("%d",&n);
    if(n==1)
{
     implimentBestFit(blockSize, blocks, processSize, processes);
}
   else if(n==2)
   {
    implimentFirstFit(blockSize, blocks, processSize, processes);
   }
  else if(n==3)
   implimentWorstFit(blockSize, blocks, processSize, processes);
    return 0 ;
}
