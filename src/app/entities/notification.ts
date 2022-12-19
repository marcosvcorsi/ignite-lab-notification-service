import { Replace } from '@/helpers/replace';
import { Content } from './content';
import { ObjectID } from 'bson';

export type NotificationProps = {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  canceledAt?: Date | null;
};

export class Notification {
  private _id?: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date; id?: string }>,
  ) {
    this._id = props.id ?? new ObjectID().toString();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(id: string | undefined) {
    this._id = id;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get isCanceled(): boolean {
    return !!this.props.canceledAt;
  }

  public get isRead(): boolean {
    return !!this.props.readAt;
  }

  public cancel(): void {
    this.props.canceledAt = new Date();
  }

  public read(): void {
    this.props.readAt = new Date();
  }

  public unread(): void {
    this.props.readAt = null;
  }
}
