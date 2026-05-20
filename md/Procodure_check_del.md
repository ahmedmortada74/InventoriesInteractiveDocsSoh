← Go back to 
[Inventories Module Documentation](/Inventories)


# Procodure_check_del.aspx

## Overview

**File**: `\Inventories\Process\Procodure_check_del.aspx`
**Purpose**: Inspection and receipt request page for purchase order items with quality control committee approval
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Procurement staff, quality control inspectors, warehouse receiving personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Purchase Order Selection (Required for Loading Items)**
- **Purchase Order Dropdown**: Must select valid purchase order for loading items
- **Error Prevention**: System validates purchase order is selected before loading items
- **Data Source**: Purchese_PO_Order_Header table with supplier information
- **Default Behavior**: User must select purchase order manually
- **Error Message**: Validation prevents item loading without purchase order selection
- **Validation**: Only active purchase orders with pending items are available

#### 2. **Inspection Committee Selection (Required for Quality Control)**
- **Committee Dropdown**: Must select valid inspection committee for quality control
- **Error Prevention**: System validates committee is selected before processing
- **Data Source**: Inventories_check_header table with committee information
- **Default Behavior**: User must select committee manually
- **Error Message**: Validation prevents processing without committee selection
- **Validation**: Only active committees with proper configuration are available

#### 3. **Item Selection (Required for Processing)**
- **Item Grid Selection**: Must select valid item from purchase order items
- **Error Prevention**: System validates item is selected before processing
- **Data Source**: Purchese_PO_Order_Details table with item information
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents processing without item selection
- **Validation**: Only items with remaining quantity are available

#### 4. **Purchase Unit Selection (Required for Item Processing)**
- **Purchase Unit Dropdown**: Must select valid purchase unit for item
- **Error Prevention**: System validates purchase unit is selected before processing
- **Data Source**: Inventories_UOM table with unit information
- **Default Behavior**: User must select purchase unit manually
- **Error Message**: Validation prevents processing without purchase unit selection
- **Validation**: Only active purchase units are available

#### 5. **Delivery Unit Selection (Required for Item Processing)**
- **Delivery Unit Dropdown**: Must select valid delivery unit for item
- **Error Prevention**: System validates delivery unit is selected before processing
- **Data Source**: Inventories_UOM table with unit information
- **Default Behavior**: User must select delivery unit manually
- **Error Message**: Validation prevents processing without delivery unit selection
- **Validation**: Only active delivery units are available

#### 6. **Delivery Quantity Input (Required for Item Processing)**
- **Delivery Quantity Field**: Must enter valid delivery quantity for item
- **Error Prevention**: System validates delivery quantity is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter delivery quantity manually
- **Error Message**: Validation prevents processing with zero or negative delivery quantity
- **Validation**: Delivery quantity must be positive number

#### 7. **Expiration Date Input (Required for Item Processing)**
- **Expiration Date Field**: Must enter valid expiration date for item
- **Error Prevention**: System validates expiration date is entered before processing
- **Data Source**: User input with date validation
- **Default Behavior**: User must enter expiration date manually
- **Error Message**: Validation prevents processing without expiration date
- **Validation**: Expiration date must be valid date

#### 8. **Batch Number Input (Optional for Item Processing)**
- **Batch Number Field**: May enter batch number for item tracking
- **Error Prevention**: System allows optional batch number entry
- **Data Source**: User input with text validation
- **Default Behavior**: User may enter batch number manually
- **Error Message**: No validation required as this is optional
- **Validation**: Batch number is optional

### Common Error Scenarios and Prevention

#### **Purchase Order Selection Errors**
- **Error**: No purchase order selected
- **Prevention**: Always select purchase order before loading items
- **Error**: Purchase order has no pending items
- **Prevention**: Verify purchase order has items pending inspection

#### **Inspection Committee Selection Errors**
- **Error**: No inspection committee selected
- **Prevention**: Always select inspection committee before processing
- **Error**: Committee not configured properly
- **Prevention**: Verify committee is active and configured

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before processing
- **Error**: Item has no remaining quantity
- **Prevention**: Verify item has remaining quantity before selection

#### **Unit Selection Errors**
- **Error**: No purchase unit selected
- **Prevention**: Always select purchase unit before processing
- **Error**: No delivery unit selected
- **Prevention**: Always select delivery unit before processing

#### **Quantity Input Errors**
- **Error**: No delivery quantity entered
- **Prevention**: Always enter delivery quantity before processing
- **Error**: Zero or negative delivery quantity
- **Prevention**: Always enter positive delivery quantity values

#### **Date Input Errors**
- **Error**: No expiration date entered
- **Prevention**: Always enter expiration date before processing
- **Error**: Invalid expiration date
- **Prevention**: Always enter valid expiration date values

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have inspection permissions** via employee group assignments
3. **Purchase orders must be available** in the system
4. **Inspection committees must be configured** in the system
5. **Items must be pending inspection** in the system
6. **Units must be configured** for items

#### **Required System State**
- User authentication must be active
- Inspection permissions must be configured
- Purchase order data must be current
- Inspection committee data must be current
- Item data must be available
- Unit configuration must be current

### Success Criteria

#### **For Purchase Order Selection**
- ✅ Purchase order dropdown populated with active orders only
- ✅ Purchase order validation ensures proper item loading
- ✅ Purchase order selection enables item filtering

#### **For Inspection Committee Selection**
- ✅ Committee dropdown populated with active committees only
- ✅ Committee validation ensures proper quality control
- ✅ Committee selection enables processing workflow

#### **For Item Selection**
- ✅ Item grid displays all items for selected purchase order
- ✅ Item details show complete purchase order information
- ✅ Selection functionality works properly
- ✅ Total calculations are accurate

#### **For Item Processing**
- ✅ Item processing creates proper inspection records
- ✅ Unit selection enables processing workflow
- ✅ Processing workflow works with proper validation
- ✅ Processing completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for inspection and receipt request

### Purchase Order and Committee Selection Section

```html
<!-- Purchase Order and Committee Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="txt_doc_no"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="برجاء ادخال امر التوريد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="5">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="txt_code" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" OnSelectedIndexChanged="txt_code_SelectedIndexChanged" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="data_source_tawrd" ValueField="ID" TextField="Arabic_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="ID" />
                            <dx:BootstrapListBoxField FieldName="Arabic_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="كود المورد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="supp_code"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="مسمى المورد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="Supp_name"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="لجنة الفحص" CaptionSettings-HorizontalAlign="Right" ColSpanMd="10">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="check_type" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="True" DataSourceID="SqlDataSource1" ValueField="id" TextField="description">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="description" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="البحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn" Width="100%" Text="بحث" OnClick="search_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Purchase Order Items Grid Section

```html
<!-- Purchase Order Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGrid" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" DataSourceID="SqlDataSource4" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" AutoPostBack="True" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="checkGrid_SelectionChanged">
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                    <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="15px"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Caption="ID" Visible="false" VisibleIndex="0">
                            <SettingsEditForm Visible="False"></SettingsEditForm>
                        </dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="itemcode" Caption="كود" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="TotalPOAmount" Caption="الكمية علي امر التوريد" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Amount_Bouns" Caption="كمية اضافية" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلمة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Grand_price_unit" Caption="سعر الوحدة الصافى" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="قيمة الخصم" VisibleIndex="8" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Tax" Caption="الضريبة" Visible="false" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى القيمة" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Default_Store" Caption="المخزن الافتراضى" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية على طلب الشراء" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="purchase_unit" Caption="وحدة طلب الشراء" Visible="false" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                    </Columns>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="50">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                    <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                    <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                </dx:BootstrapGridView>
            </dx:ContentControl>
        </ContentCollection>
    </dx:BootstrapLayoutItem>
</Items>
</dx:BootstrapLayoutGroup>
```

### Item Processing Section

```html
<!-- Item Processing -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم فاتورة المورد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" Visible="false">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="true" Visible="false" Width="100%" ID="inv_no"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="وحدة الشراء" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="purchase_unit" runat="server" AutoPostBack="True" OnSelectedIndexChanged="purchase_unit_SelectedIndexChanged" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="SqlDataSource2" ValueField="id" TextField="description">
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكمية بوحدة الشراء" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="purchase_quatity"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="وحدة الاستلام" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="receive_unit" runat="server" TextFormatString="{0}" AutoPostBack="True" OnSelectedIndexChanged="receive_unit_SelectedIndexChanged" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="SqlDataSource3" ValueField="id" TextField="description">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="description" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكمية بوحدة الاستلام" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="purchase_delivery"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="الكمية الواردة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" Enabled="true" NumberType="Float" MinValue="0" AllowMouseWheel="false" MaxValue="1000000" Width="100%" ID="delivery_amount"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="تاريخ الصلاحية" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapDateEdit runat="server" Enabled="true" Width="100%" ID="exp_date" DisplayFormatString="yyyy-MM-dd"></dx:BootstrapDateEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم التشغيلة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Width="100%" ID="use_number"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="رقم الدفعة" Visible="false" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="batch_no"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="add" runat="server" ClientInstanceName="btn" Width="100%" Text="اضافة" OnClick="add_Click1">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Secondary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="delete" runat="server" ClientInstanceName="btn" Width="100%" Text="حذف" OnClick="delete_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-arrow-up" />
                        <SettingsBootstrap RenderOption="Warning" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="Edit" runat="server" ClientInstanceName="btn" Width="100%" Enabled="false" Text="تعديل" OnClick="Edit_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                        <CssClasses Icon="simple-icon-cursor" />
                        <SettingsBootstrap RenderOption="Dark" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Items Grid Section

```html
<!-- Temporary Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource5" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="checkGrid_SelectionChanged1">
                    <Settings ShowFilterRow="true" />
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                    <Columns>
                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Caption="كود" Visible="false" VisibleIndex="0">
                            <SettingsEditForm Visible="False"></SettingsEditForm>
                        </dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Arabic_name" Caption="اسم المورد" Visible="true" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="الكمية" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلمة" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Grand_price_unit" Caption="سعر الوحدة الصافى" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" Visible="false" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="الخصم" Visible="false" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الدفعة" Visible="false" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="use_number" Caption="رقم التشغيلة" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                    </Columns>
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="50">
                        <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                    </SettingsPager>
                    <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                    <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                </dx:BootstrapGridView>
            </dx:ContentControl>
        </ContentCollection>
    </dx:BootstrapLayoutItem>
    <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <ContentCollection>
            <dx:ContentControl>
                <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn" Width="100%" Text="حفظ" OnClick="save_btn_Click">
                    <ClientSideEvents Click="function(s, e) { DisableButton3(btn,'btn'); }" />
                    <CssClasses Icon="simple-icon-cursor" />
                    <SettingsBootstrap RenderOption="Danger" />
                </dx:BootstrapButton>
            </dx:ContentControl>
        </ContentCollection>
    </dx:BootstrapLayoutItem>
</Items>
</dx:BootstrapLayoutGroup>
```

### Final Inspection Receipts Grid Section

```html
<!-- Final Inspection Receipts Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="grid_GridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource6" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnHtmlDataCellPrepared="grid_GridView1_HtmlDataCellPrepared" OnCustomColumnDisplayText="grid_GridView1_CustomColumnDisplayText" OnSelectionChanged="grid_GridView1_SelectionChanged">
                <Settings ShowFilterRow="true" ShowFooter="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود" VisibleIndex="0">
                        <SettingsEditForm Visible="False"></SettingsEditForm>
                    </dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="الكمية" Visible="true" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية الواردة" Visible="true" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" Visible="true" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى القيمة" Visible="false" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Supplier_code" Caption="كود المورد" Visible="true" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="full_name" Caption="اسم المورد" Visible="true" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="امر التوريد" Visible="true" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن الافتراضى" Visible="true" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم الدفعة" Visible="true" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" Visible="true" VisibleIndex="15"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="fk_check" Caption="كود اللجنة" Visible="true" VisibleIndex="16"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="كود الاستلام" Visible="true" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" Visible="true" VisibleIndex="19"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="use_number" Caption="رقم التشغيلة" Visible="true" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Status_check" Caption="الحالة" Visible="true" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="الخصم" Visible="false" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="رقم وحدة الشراء" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="رقم وحدة الاستلام" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="رقم المستند" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم المستند" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_quantity" Caption="معامل التحويل وحدات الاستلام" Visible="false" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="NUM" SummaryType="Count" />
                    <dx:ASPxSummaryItem FieldName="Amount" SummaryType="Sum" />
                    <dx:ASPxSummaryItem FieldName="Total_Price" SummaryType="Sum" />
                    <dx:ASPxSummaryItem FieldName="Remain_Amount" SummaryType="Sum" />
                </TotalSummary>
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Purchase Order Parameters**:
- `@FK_OrderID` - Purchase order ID for filtering items

**User Parameters**:
- `@user` - User ID for filtering temporary and final records

**Item Parameters**:
- `@itemcode` - Item code for filtering units

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Purchase Order Selection**: Loads items based on selected purchase order
3. **Committee Selection**: Loads committee information for quality control
4. **Item Selection**: Loads item information for selected item
5. **Unit Selection**: Loads unit information for selected item
6. **Item Processing**: Processes item with quantity and date information
7. **Item Addition**: Adds item to temporary grid
8. **Item Deletion**: Deletes item from temporary grid
9. **Item Save**: Saves complete inspection receipt records

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads purchase order information
3. Sets default inspection state
4. Initializes date displays

### txt_code_SelectedIndexChanged Method

```csharp
protected void txt_code_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected purchase order

**Process**:
1. Validates purchase order selection
2. Sets parameters for item data source
3. Binds item grid
4. Updates purchase order information display

### check_type_SelectedIndexChanged Method

```csharp
protected void check_type_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads committee information for quality control

**Process**:
1. Validates committee selection
2. Sets committee parameters
3. Updates committee information display

### checkGrid_SelectionChanged Method

```csharp
protected void checkGrid_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads item information for selected item

**Process**:
1. Validates item selection
2. Loads item details
3. Updates item information display
4. Enables processing workflow

### add_Click1 Method

```csharp
protected void add_Click1(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary grid

**Process**:
1. Validates all required fields are filled
2. Validates delivery quantity is greater than 0
3. Validates expiration date is entered
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary grid
7. Clears form fields for next addition

### delete_Click Method

```csharp
protected void delete_Click(object sender, EventArgs e)
```

**Purpose**: Deletes item from temporary grid

**Process**:
1. Validates item selection
2. Deletes item from temporary table
3. Refreshes temporary grid
4. Provides success feedback

### Edit_Click Method

```csharp
protected void Edit_Click(object sender, EventArgs e)
```

**Purpose**: Edits item in temporary grid

**Process**:
1. Validates item selection
2. Validates all required fields are filled
3. Updates item in temporary table
4. Refreshes temporary grid
5. Provides success feedback

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete inspection receipt records

**Process**:
1. Validates at least one item is added
2. Generates new inspection document number
3. Inserts inspection header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

## Database Integration

### Core Database Tables

#### **Purchese_PO_Order_Header**
- **Purpose**: Purchase order header information
- **Key Fields**: ID, Sup_Code_fk, PO_Type, active
- **Usage**: Provides purchase order list for filtering
- **Filtering**: Only active purchase orders with pending items

#### **Purchese_PO_Order_Details**
- **Purpose**: Purchase order details with item information
- **Key Fields**: ID, PO_ID_FK, itemcode, Amount, Done_Amount, Remain_Amount, Price_unit, Total_Price, Discount, Tax, Grand_Total, purchase_unit, Amount_Bouns, Grand_price_unit, pc_status, po_close
- **Usage**: Tracks purchase order items for inspection
- **Filtering**: Only items with remaining quantity

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, Default_Store, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description, active
- **Usage**: Provides unit information for items
- **Filtering**: Only active units

#### **Inventories_UOM_item_unit**
- **Purpose**: Item unit configuration
- **Key Fields**: unit_id, item_code, unit_type_id, Quantity
- **Usage**: Provides unit conversion information
- **Filtering**: Only active unit configurations

#### **Inventories_check_header**
- **Purpose**: Inspection committee configuration
- **Key Fields**: id, description, temp_exp, check_type, active, Item_type_id, check_id
- **Usage**: Provides committee list for quality control
- **Filtering**: Only active committees with proper configuration

#### **Inventories_Examination_receipt_temp**
- **Purpose**: Temporary inspection receipt records before save
- **Key Fields**: ID, PO_ID_FK, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit, delivery_id_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, Temp_user, doc_id, Grand_price_unit, use_number
- **Usage**: Tracks inspection receipt items before save

#### **Inventories_Examination_receipt**
- **Purpose**: Inspection receipt records
- **Key Fields**: ID, PO_ID_FK, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit, delivery_id_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, inv_num, delivery_id_quantity, use_number
- **Usage**: Tracks inspection receipt items for inspection

#### **purches_Supplier_record**
- **Purpose**: Supplier master data
- **Key Fields**: Supplier_code, Arabic_name, active
- **Usage**: Provides supplier information for display
- **Filtering**: Only active suppliers

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing inspection data

#### **Purchase Order Filtering**
```sql
SELECT distinct poh.ID, supp.Arabic_name, poh.Sup_Code_fk 
FROM Purchese_PO_Order_Header AS poh 
INNER JOIN purches_Supplier_record AS supp ON poh.Sup_Code_fk=supp.Supplier_code 
inner join Purchese_PO_Order_Details dd on poh.ID=dd.PO_ID_FK
WHERE (poh.PO_Type!=1) AND (poh.active=1) and dd.po_close not in (2,5) and dd.pc_status = 5 and (dd.Remain_Amount <> 0)
```

**Filtering Logic**: Shows only purchase orders with pending items
**Permission Logic**: Only purchase orders with pending items are available
**Validation**: Ensures purchase order has items pending inspection

#### **Item Filtering**
```sql
SELECT pod.ID, pod.itemcode, Inventories_Item_Settings.arabic_name, pod.Amount, pod.Discount, pod.Tax, pod.purchase_unit, pod.Grand_Total, Inventories_Item_Settings.Default_Store, pod.Price_unit, (pod.PO_DemandAmount) AS TotalPOAmount, pod.Amount_Bouns, pod.Total_Price, pod.Remain_Amount, pod.Done_Amount, Grand_price_unit
FROM Purchese_PO_Order_Details AS pod 
INNER JOIN Purchese_PO_Order_Header AS poh on pod.PO_ID_FK=poh.ID 
INNER JOIN Inventories_Item_Settings on Inventories_Item_Settings.item_code=pod.itemcode  
WHERE (poh.ID=@FK_OrderID) AND (pod.Amount!=pod.Done_Amount) AND (pod.Done_Amount<pod.Amount) and (pod.active<>0 or pod.active is null) and pod.pc_status=5 and pod.po_close not in (2,5)
```

**Filtering Logic**: Shows only items with remaining quantity
**Permission Logic**: Only items with remaining quantity are available
**Validation**: Ensures item has remaining quantity

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to purchase order, committee, and unit dropdowns

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("Please wait...");
}
```

**Button Logic**: Disables button and changes text during processing
**User Experience**: Prevents duplicate clicks and provides processing feedback
**Usage**: Applied to all operation buttons to prevent multiple submissions

### Checkbox Selection Function

```javascript
function CheckOne(obj) {
    var grid = obj.parentNode.parentNode.parentNode;
    var inputs = grid.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (obj.checked && inputs[i] != obj && inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}
```

**Checkbox Logic**: Ensures only one checkbox is selected at a time
**User Experience**: Provides single selection behavior for grid
**Usage**: Applied to grid checkboxes for single selection

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

### Popup Handling Function

```javascript
var keyValue;
function OnMoreInfoClick(element, key) {
    callbackPanel.SetContentHtml("");
    popup.ShowAtElement(element);
    keyValue = key;
}
function popup_Shown(s, e) {
    callbackPanel.PerformCallback(keyValue);
}
```

**Popup Logic**: Handles popup display and callback
**User Experience**: Provides detailed information display
**Usage**: Applied to grid for detailed information display

### Back Button Prevention Function

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Back Button Logic**: Prevents browser back button usage
**User Experience**: Ensures proper workflow navigation
**Usage**: Applied to page for workflow security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Purchase Order and Committee Selection Section**
```html
<!-- Purchase Order and Committee Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="برجاء ادخال امر التوريد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="5">
        <dx:BootstrapLayoutItem Caption="كود المورد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="1">
        <dx:BootstrapLayoutItem Caption="مسمى المورد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="لجنة الفحص" CaptionSettings-HorizontalAlign="Right" ColSpanMd="10">
        <dx:BootstrapLayoutItem Caption="البحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Purchase Order Items Grid Section**
```html
<!-- Purchase Order Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
```

#### **3. Item Processing Section**
```html
<!-- Item Processing -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem Caption="رقم فاتورة المورد" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" Visible="false">
        <dx:BootstrapLayoutItem Caption="وحدة الشراء" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الكمية بوحدة الشراء" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="وحدة الاستلام" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الكمية بوحدة الاستلام" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="الكمية الواردة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="تاريخ الصلاحية" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="رقم التشغيلة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
        <dx:BootstrapLayoutItem Caption="رقم الدفعة" Visible="false" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Temporary Items Grid Section**
```html
<!-- Temporary Items Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **5. Final Inspection Receipts Grid Section**
```html
<!-- Final Inspection Receipts Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Purchase Order Data Source
SqlDataSource data_source_tawrd = new SqlDataSource();
data_source_tawrd.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
data_source_tawrd.SelectCommand = "SELECT distinct poh.ID, supp.Arabic_name, poh.Sup_Code_fk FROM Purchese_PO_Order_Header AS poh INNER JOIN purches_Supplier_record AS supp ON poh.Sup_Code_fk=supp.Supplier_code inner join Purchese_PO_Order_Details dd on poh.ID=dd.PO_ID_FK WHERE (poh.PO_Type!=1) AND (poh.active=1) and dd.po_close not in (2,5) and dd.pc_status = 5 and (dd.Remain_Amount <> 0)";

// Committee Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "select ID,description from Inventories_check_header where (temp_exp=0 or check_type=1) and active=1 and Item_type_id=@FK_check_type and check_id='1'";

// Purchase Unit Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select Inventories_UOM.id,Inventories_UOM.description from Inventories_UOM inner join Inventories_UOM_item_unit on Inventories_UOM.id=Inventories_UOM_item_unit.unit_id where unit_type_id='1' and item_code=@itemcode and (Inventories_UOM.active = 1)";

// Delivery Unit Data Source
SqlDataSource SqlDataSource3 = new SqlDataSource();
SqlDataSource3.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource3.SelectCommand = "select Inventories_UOM.id,Inventories_UOM.description,Inventories_UOM_item_unit.Quantity from Inventories_UOM inner join Inventories_UOM_item_unit on Inventories_UOM.id=Inventories_UOM_item_unit.unit_id where unit_type_id='2' and item_code=@itemcode and (Inventories_UOM.active = 1)";

// Purchase Order Items Data Source
SqlDataSource SqlDataSource4 = new SqlDataSource();
SqlDataSource4.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource4.SelectCommand = "SELECT pod.ID, pod.itemcode, Inventories_Item_Settings.arabic_name, pod.Amount, pod.Discount, pod.Tax, pod.purchase_unit, pod.Grand_Total, Inventories_Item_Settings.Default_Store, pod.Price_unit, (pod.PO_DemandAmount) AS TotalPOAmount, pod.Amount_Bouns, pod.Total_Price, pod.Remain_Amount, pod.Done_Amount, Grand_price_unit FROM Purchese_PO_Order_Details AS pod INNER JOIN Purchese_PO_Order_Header AS poh on pod.PO_ID_FK=poh.ID INNER JOIN Inventories_Item_Settings on Inventories_Item_Settings.item_code=pod.itemcode WHERE (poh.ID=@FK_OrderID) AND (pod.Amount!=pod.Done_Amount) AND (pod.Done_Amount<pod.Amount) and (pod.active<>0 or pod.active is null) and pod.pc_status=5 and pod.po_close not in (2,5)";

// Temporary Items Data Source
SqlDataSource SqlDataSource5 = new SqlDataSource();
SqlDataSource5.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource5.SelectCommand = "SELECT Inventories_Examination_receipt_temp.ID,PO_ID_FK,purches_Supplier_record.Arabic_name, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit,Inventories_UOM.description, delivery_id_unit,uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, Temp_user, doc_id,Grand_price_unit,use_number FROM Inventories_Examination_receipt_temp inner join Inventories_UOM on Inventories_UOM.id=Inventories_Examination_receipt_temp.delivery_id_unit inner join Inventories_UOM as uom on uom.id=Inventories_Examination_receipt_temp.Purchase_Id_unit inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.ID=Inventories_Examination_receipt_temp.PO_ID_FK inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk where Temp_user=@user and PO_ID_FK=@FK_OrderID";

// Final Inspection Receipts Data Source
SqlDataSource SqlDataSource6 = new SqlDataSource();
SqlDataSource6.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource6.SelectCommand = "SELECT null as NUM,ss.arabic_name,purches_Supplier_record.Supplier_code,Inventories_Examination_receipt.Store_id, Inventories_Examination_receipt.ID,PO_ID_FK,purches_Supplier_record.Arabic_name as full_name, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit,Inventories_UOM.description, delivery_id_unit,uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id,inv_num,delivery_id_quantity,CASe when Examination_done='0' and receipt_done='0' then 'تحت الفحص' when Examination_done='1' and receipt_done='0' then 'تحت الاستلام' when Examination_done='1' and receipt_done='1' then 'مرحلة الاضافة' else 'تم الرفض' end as Status_check,use_number FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id=Inventories_Examination_receipt.delivery_id_unit inner join Inventories_UOM as uom on uom.id=Inventories_Examination_receipt.Purchase_Id_unit inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.id=Inventories_Examination_receipt.PO_ID_FK inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk inner join Inventories_Item_Settings ss on ss.item_code=Inventories_Examination_receipt.Itemcode where Emp_code=@user and Examination_done='0' and receipt_done='0'";
```

## Business Logic and Validation

### Purchase Order Selection Validation

```csharp
protected void txt_code_SelectedIndexChanged(object sender, EventArgs e)
{
    if (txt_code.Value == "" || txt_code.Value == null)
    {
        // Clear item grid
        checkGrid.DataSource = null;
        checkGrid.DataBind();
        return;
    }
    // ... additional validation
}
```

**Purchase Order Logic**: Validates purchase order selection before loading items
**Error Prevention**: Prevents item loading without purchase order selection

### Committee Selection Validation

```csharp
protected void check_type_SelectedIndexChanged(object sender, EventArgs e)
{
    if (check_type.Value == "" || check_type.Value == null)
    {
        // Clear committee information
        return;
    }
    // ... additional validation
}
```

**Committee Logic**: Validates committee selection before processing
**Error Prevention**: Prevents processing without committee selection

### Item Selection Validation

```csharp
protected void checkGrid_SelectionChanged(object sender, EventArgs e)
{
    if (checkGrid.Selection.Count == 0)
    {
        // Clear item information
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before processing
**Error Prevention**: Prevents processing without item selection

### Unit Selection Validation

```csharp
protected void purchase_unit_SelectedIndexChanged(object sender, EventArgs e)
{
    if (purchase_unit.Value == "" || purchase_unit.Value == null)
    {
        // Clear unit information
        return;
    }
    // ... additional validation
}
```

**Unit Logic**: Validates unit selection before processing
**Error Prevention**: Prevents processing without unit selection

### Delivery Quantity Validation

```csharp
protected void add_Click1(object sender, EventArgs e)
{
    if (Convert.ToDecimal(delivery_amount.Value) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية الواردة');", true);
        return;
    }
    // ... additional validation
}
```

**Delivery Quantity Logic**: Validates delivery quantity is positive and within limits
**Error Prevention**: Prevents processing with invalid delivery quantity

### Expiration Date Validation

```csharp
protected void add_Click1(object sender, EventArgs e)
{
    if (exp_date.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال تاريخ الصلاحية');", true);
        return;
    }
    // ... additional validation
}
```

**Expiration Date Logic**: Validates expiration date is entered before processing
**Error Prevention**: Prevents processing without expiration date

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Purchase Order Selection Validation**: Must select purchase order before loading items
- **Committee Selection Validation**: Must select committee before processing
- **Item Selection Validation**: Must select item before processing
- **Unit Selection Validation**: Must select unit before processing
- **Delivery Quantity Validation**: Must enter delivery quantity before processing
- **Expiration Date Validation**: Must enter expiration date before processing

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Purchase Order Validation**: Ensures purchase order is active and has pending items
- **Committee Validation**: Ensures committee is active and configured
- **Item Validation**: Ensures item has remaining quantity
- **Unit Validation**: Ensures unit is active and configured
- **Delivery Quantity Validation**: Ensures delivery quantity is positive and within limits
- **Expiration Date Validation**: Ensures expiration date is valid

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Purchase Order Access**: Ensures user has access to selected purchase order
- **Inspection Access**: Ensures user can access and modify inspection records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Item Addition Success**: "تم اضافة الصنف" (Item added successfully)
- **Item Deletion Success**: "تم حذف الصنف" (Item deleted successfully)
- **Item Edit Success**: "تم تعديل الصنف" (Item edited successfully)
- **Save Success**: "تم حفظ طلب الفحص" (Inspection request saved successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Inspection and Receipt Management System**
- **Database Tables**:
  - `Purchese_PO_Order_Header` - Purchase order header information
  - `Purchese_PO_Order_Details` - Purchase order details
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `Inventories_UOM_item_unit` - Item unit configuration
  - `Inventories_check_header` - Inspection committee configuration
  - `Inventories_Examination_receipt_temp` - Temporary inspection receipt records
  - `Inventories_Examination_receipt` - Inspection receipt records
  - `purches_Supplier_record` - Supplier master data
- **Integration Details**:
  - Purchase order selection controls item filtering
  - Committee selection controls quality control
  - Item selection controls processing workflow
  - Processing tracked with complete information
- **Data Flow**:
  - Purchase orders filtered for user access
  - Items filtered by purchase order
  - Processing tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all inspection operations
  - Purchase order access controlled by user permissions

### Data Exchange

#### **Purchase Order and Item Information**
- **Database Tables**:
  - `Purchese_PO_Order_Header` - Purchase order header information
  - `Purchese_PO_Order_Details` - Purchase order details
- **Real-time Data**:
  - Purchase order information for filtering
  - Item information for processing
  - Details information and calculations
- **Data Relationships**:
  - Purchase orders linked to items via PO_ID_FK
  - Items linked to processing via itemcode
  - Processing tracked by user

#### **Item and Processing Information**
- **Database Tables**:
  - `Inventories_Examination_receipt_temp` - Temporary inspection receipt records
  - `Inventories_Examination_receipt` - Inspection receipt records
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Item details and descriptions
  - Processing quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to processing via itemcode
  - Processing tracked by purchase order
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار امر التوريد" Error**
- **Cause**: Purchase order not selected before loading items
- **Solution**: Always select purchase order before loading items
- **Prevention**: Purchase order selection is required for all inspection operations

#### **"الرجاء اختيار لجنة الفحص" Error**
- **Cause**: Committee not selected before processing
- **Solution**: Always select committee before processing
- **Prevention**: Committee selection is required for all inspection operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before processing
- **Solution**: Always select item before processing
- **Prevention**: Item selection is required for all inspection operations

#### **"الرجاء ادخال الكمية الواردة" Error**
- **Cause**: Delivery quantity not entered before processing
- **Solution**: Always enter delivery quantity before processing
- **Prevention**: Delivery quantity entry is required for all inspection operations

#### **"الرجاء ادخال تاريخ الصلاحية" Error**
- **Cause**: Expiration date not entered before processing
- **Solution**: Always enter expiration date before processing
- **Prevention**: Expiration date entry is required for all inspection operations

#### **No Items Found**
- **Cause**: Purchase order has no pending items
- **Solution**: Verify purchase order has items pending inspection
- **Prevention**: Ensure purchase orders have items pending inspection

#### **Save Failed Error**
- **Cause**: Inspection request cannot be saved
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before saving

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Inspection Access**: Access to inspection operations
- **Purchase Order Access**: Access to purchase orders with pending items

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Inspection Workflow**: Understanding of inspection process
- **Purchase Order Management**: Knowledge of purchase order selection and filtering
- **Item Management**: Knowledge of item selection and processing
- **Inspection Management**: Familiarity with inspection save and rejection operations

## Usage Examples

### Basic Inspection Workflow

1. **Page Load**: Verify page loads with default data
2. **Purchase Order Selection**: Select purchase order for item filtering
3. **Committee Selection**: Select committee for quality control
4. **Item Selection**: Select item from purchase order items grid
5. **Unit Selection**: Select purchase unit and delivery unit
6. **Quantity Entry**: Enter delivery quantity
7. **Date Entry**: Enter expiration date
8. **Batch Entry**: Enter batch number (optional)
9. **Item Addition**: Add item to temporary grid
10. **Repeat Items**: Add additional items as needed
11. **Save**: Save complete inspection request

### Multi-Item Inspection Management

1. **Purchase Order Selection**: Select purchase order for item filtering
2. **Committee Selection**: Select committee for quality control
3. **Multiple Item Selection**: Select multiple items for inspection
4. **Unit Configuration**: Configure units for each item
5. **Quantity Entry**: Enter delivery quantity for each item
6. **Date Entry**: Enter expiration date for each item
7. **Item Addition**: Add all items to temporary grid
8. **Save**: Save complete inspection request with all items
9. **Verification**: Verify inspection request is saved correctly

### Item Edit Workflow

1. **Purchase Order Selection**: Select purchase order for item filtering
2. **Committee Selection**: Select committee for quality control
3. **Item Selection**: Select item from purchase order items grid
4. **Unit Selection**: Select purchase unit and delivery unit
5. **Quantity Entry**: Enter delivery quantity
6. **Date Entry**: Enter expiration date
7. **Item Edit**: Edit item in temporary grid
8. **Save**: Save complete inspection request with edited items