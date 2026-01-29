import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from "typeorm";
import { Test } from "../schema/app/test.entity";
import { ActivityTest } from "../schema/activity/activityTest.entity";

@EventSubscriber()
export class TestSubscriber
    implements EntitySubscriberInterface<Test> {
    listenTo() {
        return Test;
    }

    async afterInsert(event: InsertEvent<Test>): Promise<void> {
        try {
            await ActivityTest.save({
                ...event.entity,
            });
        } catch (error) {
            console.error("Test afterInsert error", error);
        }
    }

    async afterUpdate(event: UpdateEvent<Test>): Promise<void> {
        try {
            if (event.entity) {
                await ActivityTest.save({
                    ...(event.entity as Test),
                });
            }
        } catch (error) {
            console.error("Test afterUpdate error", error);
        }
    }
}
