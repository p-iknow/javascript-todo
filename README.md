# todo
레벨2

### 설계

### 플로우

1. 입력 -> 명령어 
2. 명령어를 받아서 해석한다. -> add, show, update
3. add를 받았을 떄 todos에 받은 todo를 추가한다. 
4. show를 받았을 때 같은 상태에 있는 것들을 출력한다. 
5. update를 받았을 때 기존에 있는 상태를 update한다. 
6.  todo, doing, done 


7. Model todos 라는 객체가 있고 
todo안에는 id로 접근 가능한 todo가 있다
todo에는 
id: {
    todo: '할 일 내용'
    state: 상태 
    time: {
        startTime,
        doneTime,
        spendTime,
    }
}

### 요구사항 소요시간결과의 복잡도 측정

todos에는 stateCounter가 있다. 
상태들의 개수를 다 가지고 있다. 
fastOne 가장 빨리 끝낸 친구에 id를 알고 있다. 

1~30회 완료된 일이 늘어날수록 처음에는 그 횟수만큼 수행해서 최소값 최대값을 찾는다. 
업데이트 된 일이 있으면 최대값, 최소값과 비교하여 id를 업데이트 한다.
시간복잡도는 O(n)일 것 같다. 
지금 우선 생각으로는 최소값과 최대값을 저장해서 업데이트 될 때마다 비교하여 최소 최대값을 바꿔 주는 것이 좋은 방법이라고 생각하고 있다. 
나쁜 방법은 매번 다 돌려서 최소/최대값을 찾는 것이다!



